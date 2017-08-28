import { QuizService } from './../../providers/quiz';
import { LoadingController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-analysis-answers',
  templateUrl: 'analysis-answers.html',
})
export class AnalysisAnswersPage implements OnInit {


  loader: any;
  sets: { question: string, answer: string }[] = [];

  constructor(private navParams: NavParams, private view: ViewController,
    private _loader: LoadingController, private _quiz: QuizService) {
  }

  ngOnInit(): void {
    this.loader = this._loader.create({
      spinner: 'bubbles',
      content: "Loading answers...",
      duration: 3000
    });
    this.loader.present();
    this._quiz.loadQuizAnswers().then((snap:
      { question: string, answer: string }[]) => {
      this.loader.dismiss();
      this.sets = snap;
    });
  }

  ionViewDidLoad() {

  }

  onClose() {
    this.loader.dismiss();
    this.view.dismiss();
  }

}
