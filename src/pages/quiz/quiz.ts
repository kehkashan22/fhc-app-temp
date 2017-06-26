import { LoadingController, AlertController } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth';
import { QuizService } from './../../providers/quiz';
import { Answer } from './../../data/answer.interface';
import { Quiz } from './../../data/quiz.interface';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { trigger, state, style, transition, animate } from "@angular/animations";
import _ from "lodash";

@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
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
  question: boolean = true;
  answers: boolean = false;
  trigger: boolean = false;
  url: string = '';
  analysisPage = 'AnalysisPage';
  percentage: any;
  results: boolean = true;
  answeredQuestion : Quiz;
  secondQuestion: boolean = false;
  progressIndex: number = 1;
  quizTime: number = 0;

  analysis: { quizId: string, quizNumber: any, marks: number }[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private quizService: QuizService,
    private authProvider: AuthProvider,
    private loader: LoadingController,
    private alertCtrl: AlertController) {
  }

  ngOnInit(){
    let quiz = this.quizService.getQuiz();
    //Needed deep cloning, because here we were making changes to answer object nested inside an
    //nested inside another object array, tried slice() but it gave only a shallow copy and the Answers array
    //was still getting modified at the source
    //_.lodash() is being used to improve performance of JSON parse
    this.quizCollection = _.cloneDeep(quiz);
   // this.quizCollection = JSON.parse(JSON.stringify(quiz));
    if(this.quizCollection){
      this.currentQuestion = this.quizCollection[0];
    }
  }

  ionViewDidLoad() {

  }

  handleTimeUp(timeUp: boolean){
     const alert = this.alertCtrl.create({
      title: 'Oops!',
      subTitle: 'Your time is up...',
      message: 'Let\'s see how you did.',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            this.question=false;
            this.analysisFunc();
          }
        }
      ]
    });
    alert.present();
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
          this.analysisFunc();
        }
      }, 500);
  }

  analysisFunc() {
    this.marks = 0;
    this.answers = true;
    for (var i = 0; i < this.quizCollection.length; i++) {
      for (var j = 0; j < (this.quizCollection[i].answers).length; j++) {
        if (this.quizCollection[i].answers[j].selected && this.quizCollection[i].answers[j].correct) {
          ++this.marks;

        }
      }
    }
    this.percentage = this.marks*100/this.quizCollection.length;
    this.answeredQuestion = this.quizCollection[0];
    this.index=0;
  }

  getClassString(per: string){
    let perInt = +per | 0;
    return 'c100 p'+ perInt;
  }

  toExplanation(){
    this.results = false;
     this.answeredQuestion=this.quizCollection[0];
    this.index=0;
    this.secondQuestion = false;
  }

  changeExplanation(direction: string){
    this.visibleState = (this.visibleState == 'visible') ? 'invisible' : 'visible';
    if(direction==="next"){
      this.index=this.index+1;
    }else if(direction==="previous" && this.index > 0){
      this.index=this.index-1;
    }
    this.checkButtonVisibility();
    setTimeout(
      () => {
        this.visibleState = 'visible';
        if (this.index < this.quizCollection.length) {
          this.answeredQuestion = this.quizCollection[this.index];
           this.progressIndex = this.index+1;
        } else {
          this.results = true;
          this.progressIndex=1;
        }
      }, 500);
  }

  toQuizList(){
    this.navCtrl.pop();
  }

  checkAnswer(answer: Answer){
    if(answer.selected === true){
      return true;
    }
    else{
      return false;
    }
  }

  checkButtonVisibility(){
    if(this.index > 0){
        this.secondQuestion = true;
    }else{
      this.secondQuestion = false;
    }
  }

  getAnswerClass(answer: Answer){
    if(answer.selected && !answer.correct){
      return 'wrong';
    }
    if(answer.correct){
      return 'right';
    }
  }

}
