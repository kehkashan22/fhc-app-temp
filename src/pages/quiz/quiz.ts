import { AnalyticsProvider } from './../../providers/analytics/analytics';
import { QuizStore } from './../../data/quiz/quiz-store.interface';
import { QuizStoreProvider } from './../../providers/quiz-store';
import { Quizzes } from './../../data/quizzes.interface';
import { LoadingController, AlertController } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth';
import { QuizService } from './../../providers/quiz';
import { Answer } from './../../data/answer.interface';
import { Quiz } from './../../data/quiz.interface';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import _ from "lodash";

@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html'
})
export class QuizPage implements OnInit {

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

  //button disable
  disabled = false;

  secondQuestion: boolean = false;


  @ViewChild('slide1') slide1: Slides;
  @ViewChild('slide2') slide2: Slides;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private quizService: QuizService,
    private authProvider: AuthProvider,
    private loader: LoadingController,
    private alertCtrl: AlertController,
    private _quizStore: QuizStoreProvider,
    private cdRef: ChangeDetectorRef,
  private _analytics: AnalyticsProvider) {
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
    if (this.slide1) {
      this.slide1.lockSwipes(true);
    }
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
    this._analytics.analyse('quiz');

  }

  ionViewDidLoad() {
    if (this.question) {
      this.slide1.lockSwipes(true);
    }

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

  changeQuestion(quesInx: number, ansInx: number) {
    this.quizCollection[quesInx].answers[ansInx].selected = true;
    if (quesInx + 1 < this.quizCollection.length) {
      this.slide1.lockSwipes(false);
      this.slide1.slideNext(300);
      this.slide1.lockSwipes(true);
    } else {
      this.question = false;
      this.analysisFunc(this.storeQuiz);
    }
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
    } else if (this.percentage >= 60) {
      this.review = "Well Done!";
      this.subreview = "You have passed this quiz with flying colors!";
    } else {
      this.review = "Good Try!";
      this.subreview = "This is the average score for this quiz. Maybe you want to try for a better score?";
    }
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

    if (perInt >= 60) {
      this.percentClass = 'c100 p' + perInt + ' green ';
    } else if (perInt < 40) {
      this.percentClass = 'c100 p' + perInt;
    } else {
      this.percentClass = 'c100 p' + perInt + ' orange ';
    }

  }

  toExplanation() {
    this.progressIndex = 1;
    this.results = false;
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
            this.storeQuiz = true;
            this.progressIndex = 1;
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
    if (this.progressIndex < this.quizCollection.length) {
      this.progressIndex++;
    } else {
      this.results = true;
      this.progressIndex = 1;
    }

    if (direction === "next") {
      this.slide2.slideNext();
    } else if (direction === "previous" && this.progressIndex > 1) {
      this.slide2.slidePrev();
    }

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
    if (this.slide2.isBeginning()) {
      this.secondQuestion = false;
    } else {
      this.secondQuestion = true;
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

  slideChanged() {
    if (this.slide2.getActiveIndex() + 1 <= this.quizCollection.length) {
      this.progressIndex = this.slide2.getActiveIndex() + 1;
    }
    this.checkButtonVisibility();

  }

  quesChanged() {
    if (this.slide1.getActiveIndex() + 1 <= this.quizCollection.length) {
      this.progressIndex = this.slide1.getActiveIndex() + 1;
    }
  }

}
