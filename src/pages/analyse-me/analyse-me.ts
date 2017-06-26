import { LoadingController } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth';
import { QuizService } from './../../providers/quiz';
import { Answer } from './../../data/answer.interface';
import { Quiz } from './../../data/quiz.interface';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { trigger, state, style, transition, animate } from "@angular/animations";
import { VgAPI } from 'videogular2/core';

@IonicPage()
@Component({
  selector: 'page-analyse-me',
  templateUrl: 'analyse-me.html',

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

export class AnalyseMePage implements OnInit {
  visibleState: string = 'visible';
  index: number = 0;
  marks: number = 0;
  quizCollection: Quiz[];
  currentQuestion: Quiz;
  question: boolean = true;
  answers: boolean = false;
  trigger: boolean = false;
  url: string = '';
  analysisPage = 'AnalysisPage';
  video: boolean = true;

  analysis: { quizId: string, quizNumber: any, marks: number }[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private quizService: QuizService,
    private authProvider: AuthProvider,
    private loader: LoadingController,
    private api: VgAPI) {
  }

  ngOnInit() {
     const loader = this.loader.create({
      spinner: 'bubbles',
      content: "Loading Test..."
    });
    loader.present();
    this.authProvider.getActiveUser().getIdToken().then((token: string) => {
      this.quizService.loadQuiz(token).subscribe((data: Quiz[]) => {
        setTimeout(() => {
          loader.dismiss();
        }, 1000);
        this.quizCollection = data;
        this.currentQuestion = this.quizCollection[0];
      });
    },
    error => {
      console.log(error);
    });
  }

  changeQuestion(answer: Answer) {
    this.visibleState = (this.visibleState == 'visible') ? 'invisible' : 'visible';
    console.log(answer);
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
  }

  thisPlay() {
    this.video = false;
  }

  onPlayerReady(api: VgAPI) {
    this.api = api;

    this.api.getDefaultMedia().subscriptions.ended.subscribe(
      () => {
        this.thisPlay();
      }
    );
  }
}

