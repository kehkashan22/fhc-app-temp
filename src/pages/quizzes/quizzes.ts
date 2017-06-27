import { QuizStoreProvider } from './../../providers/quiz-store';
import { Quizzes } from './../../data/quizzes.interface';
import { QuizService } from './../../providers/quiz';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Quiz } from "../../data/quiz.interface";

@IonicPage()
@Component({
  selector: 'page-quizzes',
  templateUrl: 'quizzes.html',
})
export class QuizzesPage implements OnInit{

  chapters: { chapterID: string, quiz: { quizId: string, questions: Quiz[] }[] };
  quizPage = 'QuizPage';
  quiz : Quizzes;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private quizService: QuizService,
              private quizStore: QuizStoreProvider) {
  }

  ngOnInit() {
    this.quizStore.loadSolvedQuizzes();
  }

  ionViewDidLoad() {
    this.chapters = this.navParams.data;
  }

  toQuiz(quiz: Quizzes){
    this.quiz=quiz;
    this.navCtrl.push(this.quizPage,{
      quiz: this.quiz,
      isSolved: this.isSolved(quiz) ? true : false
    });
  }

  isSolved(quiz: Quizzes) {
    return this.quizStore.isQuizSolved(quiz);
  }

}
