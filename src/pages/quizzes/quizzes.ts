import { QuizService } from './../../providers/quiz';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Quiz } from "../../data/quiz.interface";

@IonicPage()
@Component({
  selector: 'page-quizzes',
  templateUrl: 'quizzes.html',
})
export class QuizzesPage {
  chapters: {chapterID: string, quiz: {quizId: string, questions: Quiz[] } []};
  quizPage = 'QuizPage';
  quiz : Quiz[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private quizService: QuizService) {
  }

  ionViewDidLoad() {
    this.chapters = this.navParams.data;
  }

  toQuiz(quiz: Quiz[]){
    this.quiz = quiz.slice();
    console.log(this.quiz);
    this.quizService.setQuiz(this.quiz);
    this.navCtrl.push(this.quizPage);
  }

}
