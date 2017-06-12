import { QuizService } from './../../services/quiz';
import { VideoPlayer } from '@ionic-native/video-player';
import { Answer } from './../../data/answer.interface';
import { Quiz } from './../../data/quiz.interface';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import quiz from '../../data/quiz';
import { trigger, state, style, transition, animate } from "@angular/animations";

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


  visibleState : string = 'visible';
  index: number = 0;
  marks: number = 0;
  quizCollection: Quiz[];
  currentQuestion: Quiz;
  question: boolean = true;
  answers: boolean = false;
  trigger: boolean = false;
  url: string = '';

  constructor(public navCtrl: NavController,
                public navParams: NavParams,
                 private videoPlayer: VideoPlayer,
                 private quizService : QuizService) {
  }

  ngOnInit() {

     this.quizCollection=this.quizService.getQuiz();
     console.log("QUIZ PAGE");
     console.log(this.quizCollection);
     this.currentQuestion = this.quizCollection[0];
     console.log(this.currentQuestion);

  }

  changeQuestion(answer: Answer){
      this.visibleState = (this.visibleState == 'visible') ? 'invisible' : 'visible';
      console.log(answer);
      var answerIndex=this.quizCollection[this.index].answers.indexOf(answer);
      this.quizCollection[this.index].answers[answerIndex].selected=true;
      //console.log(this.quizCollection);
      setTimeout(
        () => {
           this.visibleState = 'visible';
           if(this.index+1 < this.quizCollection.length){
            this.currentQuestion = this.quizCollection[++this.index];
            }else{
              this.question = false;
            }
        } , 500);
    }

    analysis(){
      this.marks = 0;
      this.answers = true;
      for(var i = 0; i < this.quizCollection.length ; i++){
        for(var j = 0; j < (this.quizCollection[i].answers).length ; j++){
          if(this.quizCollection[i].answers[j].selected && this.quizCollection[i].answers[j].correct){
              ++this.marks;
          }
        }
      }
    }

    thisPlay(){
    this.url="http://techslides.com/demos/sample-videos/small.mp4";
    this.videoPlayer.play(this.url).then(() => {
			this.trigger=true;
    }).catch(err => {
     console.log(err);
    });
  }
}
