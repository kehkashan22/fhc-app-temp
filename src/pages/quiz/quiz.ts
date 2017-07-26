import { QuizStore } from './../../data/quiz/quiz-store.interface';
import { QuizStoreProvider } from './../../providers/quiz-store';
import { Quizzes } from './../../data/quizzes.interface';
import { LoadingController, AlertController } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth';
import { QuizService } from './../../providers/quiz';
import { Answer } from './../../data/answer.interface';
import { Quiz } from './../../data/quiz.interface';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { trigger, state, style, transition, animate } from "@angular/animations";
import _ from "lodash";

@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
  host: {
    '[@myvisibility]': 'true',
  },
  animations: [
    trigger('myvisibility', [
      state('visible', style({
        opacity: 1
      })),
      state('invisible', style({
        opacity: 0
      })),
      transition('visible <=> invisible', animate('500ms linear'))
    ])
  ]
})
export class QuizPage implements OnInit{


  visibleState: string = 'visible';
  index: number = 0;
  marks: number = 0;
  quizCollection: Quiz[] = [];
  currentQuestion: Quiz;
  quizHeading: string = '';

  question: boolean = true;
  answers: boolean = false;
  storeQuiz: boolean = true;
  url: string = '';
  analysisPage = 'AnalysisPage';
  percentage: any;
  results: boolean = true;
  answeredQuestion: Quiz;
  secondQuestion: boolean = false;
  progressIndex: number = 1;
  quizTime: number = 0;
  iconForChip: string = '';
  percentClass: string = 'c100 p50';
  quiz: Quizzes;
  tempQuiz: Quizzes;
  analysis: { quizId: string, quizNumber: any, marks: number }[] = [];
  subjectId: string = '';
  chapterId: string = '';
  chapterType: string = '';

  review: string = '';
  subreview: string = '';

  disabled = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private quizService: QuizService,
    private authProvider: AuthProvider,
    private loader: LoadingController,
    private alertCtrl: AlertController,
    private _quizStore: QuizStoreProvider,
    private cdRef: ChangeDetectorRef) {
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit() {

    let isSolved: boolean = this.navParams.get('isSolved');
    this.subjectId = this.navParams.get('subjectId');
    this.chapterId = this.navParams.get('chapterId');
    this.tempQuiz = _.cloneDeep(this.navParams.get('quiz'));
    this.chapterType = this.navParams.get('chapterType');
    if (isSolved) {
      let tempQuizStore: QuizStore = {
        subjectId: this.subjectId,
        chapterId: this.chapterId,
        chapterType: this.chapterType,
        quiz: this.tempQuiz
      };
      this.quiz = _.cloneDeep(this._quizStore.getSolvedQuizFromStore(tempQuizStore));
    } else {
      this.quiz = _.cloneDeep(this.tempQuiz);
    }

    if (this.quiz) {
      this.quizHeading = this.quiz.quizHeading;
      this.quizTime = +this.quiz.timeInMins * 60;

      this.quizCollection = _.cloneDeep(this.quiz.questions);
    }


    if (this.quizCollection) {
      this.currentQuestion = this.quizCollection[0];
    }

    if (isSolved) {
      this.question = false;
      this.results = true;
      this.storeQuiz = !this.storeQuiz;
      this.analysisFunc(this.storeQuiz);
    }
    //Needed deep cloning, because here we were making changes to answer object nested inside an
    //nested inside another object array, tried slice() but it gave only a shallow copy and the Answers array
    //was still getting modified at the source
    //_.lodash() is being used to improve performance over JSON parse


  }

  ionViewDidLoad() {

  }

  handleTimeUp(timeUp: boolean = false) {
    if (timeUp) {
      const alert = this.alertCtrl.create({
        title: 'Oops!',
        subTitle: 'Your time is up...',
        message: 'Let\'s see how you did.',
        buttons: [
          {
            text: 'Ok',
            role: 'cancel',
            handler: () => {
              this.question = false;
              this.analysisFunc(this.storeQuiz);
            }
          }
        ]
      });
      alert.present();
    }

  }

  changeQuestion(answer: Answer) {
    this.visibleState = (this.visibleState == 'visible') ? 'invisible' : 'visible';
    var answerIndex = this.quizCollection[this.index].answers.indexOf(answer);
    this.quizCollection[this.index].answers[answerIndex].selected = true;
    setTimeout(
      () => {
        this.visibleState = 'visible';
        if (this.index + 1 < this.quizCollection.length) {
          this.currentQuestion = this.quizCollection[++this.index];
        } else {
          this.question = false;
          this.analysisFunc(this.storeQuiz);
        }
      }, 500);
  }

  //MARKS CALCULATED HERE
  analysisFunc(store: boolean) {
    this.marks = 0;
    this.answers = true;
    for (var i = 0; i < this.quizCollection.length; i++) {
      for (var j = 0; j < (this.quizCollection[i].answers).length; j++) {
        if (this.quizCollection[i].answers[j].selected && this.quizCollection[i].answers[j].correct) {
          ++this.marks;

        }
      }
    }
    this.percentage = this.marks * 100 / this.quizCollection.length | 0;
    this.getClassString(this.percentage);
    if (this.percentage < 40) {
      this.review = "Oops!";
      this.subreview = "Maybe you should give it another go?";
    } else if (this.percentage > 60) {
      this.review = "Congratulations!";
      this.subreview = "You have passed this quiz with flying colors!";
    } else {
      this.review = "Hmmm...";
      this.subreview = "This is the average score for this quiz. Maybe you want to try for a better score?";
    }
    this.answeredQuestion = this.quizCollection[0];
    this.index = 0;
    if (store) {
      this.addToQuizStore();
    }



  }

  private addToQuizStore() {
    this.quiz.marks = this.marks;
    this.quiz.questions = this.quizCollection;
    let quizStore: QuizStore = {
      subjectId: this.subjectId,
      chapterId: this.chapterId,
      chapterType: this.chapterType,
      quiz: _.cloneDeep(this.quiz),
    };
    this._quizStore.addToQuizCollection(quizStore);
  }

  private getClassString(per: string) {
    let perInt = +per | 0;

    if(perInt > 60){
        this.percentClass = 'c100 p' + perInt+ ' green ';
    }else if(perInt < 40){
        this.percentClass = 'c100 p' + perInt;
    }else{
        this.percentClass = 'c100 p' + perInt+ ' orange ';
    }

  }

  toExplanation() {
    this.results = false;
    this.answeredQuestion = this.quizCollection[0];
    this.index = 0;
    this.secondQuestion = false;
  }

  toResetScore() {
    const alert = this.alertCtrl.create({
      title: 'Re-take Quiz?',
      subTitle: 'Are you sure?',
      message: 'Retaking the quiz will reset your old score',
      buttons: [
        {
          text: 'Yes, go ahead',
          handler: () => {
            let remQuizStore: QuizStore = {
              subjectId: this.subjectId,
              chapterId: this.chapterId,
              chapterType: this.chapterType,
              quiz: this.quiz
            };
            this._quizStore.removefromQuizCollection(remQuizStore);
            this.quizCollection = _.cloneDeep(this.tempQuiz.questions);
            this.currentQuestion = this.quizCollection[0];
            this.storeQuiz = true;
            this.index = 0;
            this.question = true;
            this.results = true;
          }
        },
        {
          text: 'No, I changed my mind!',
          role: 'cancel',
          handler: () => {
            console.log('Cancelled!');
          }
        }
      ]
    });

    alert.present();
  }

  changeExplanation(direction: string) {
    this.visibleState = (this.visibleState == 'visible') ? 'invisible' : 'visible';
    if (direction === "next") {
      this.index = this.index + 1;
    } else if (direction === "previous" && this.index > 0) {
      this.index = this.index - 1;
    }

    setTimeout(
      () => {
        this.visibleState = 'visible';
        if (this.index < this.quizCollection.length) {
          this.answeredQuestion = this.quizCollection[this.index];
          this.progressIndex = this.index + 1;
        } else {
          this.results = true;
          this.progressIndex = 1;
        }
      }, 500);
    this.checkButtonVisibility();
  }

  toQuizList() {
    this.navCtrl.pop();
  }

  checkAnswer(answer: Answer) {
    if (answer.selected === true) {
      return true;
    }
    else {
      return false;
    }
  }

  checkButtonVisibility() {
    if (this.index > 0) {
      this.secondQuestion = true;
    } else {
      this.secondQuestion = false;
    }
  }

  getAnswerClass(answer: Answer) {
    if (answer.selected && !answer.correct) {
      return 'wrong';
    }
    if (answer.correct) {
      return 'right';
    }
  }

  thisAnswer(answeredQuestion: Quiz) {
    //answeredQuestion.answers

    for (var j = 0; j < (answeredQuestion.answers).length; j++) {
      if (answeredQuestion.answers[j].selected && answeredQuestion.answers[j].correct) {
        return true;
      }
    }
    return false;
  }

  toResults() {
    this.results = true;
  }

  onDone($event) {
    this.disabled = false;
    console.log('the end of the animation');
  }

  onStart($event) {
    this.disabled = true;
    console.log('the start of the animation');
  }

}
