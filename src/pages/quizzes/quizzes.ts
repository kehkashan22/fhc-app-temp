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

  chapters: { chapterId: string, quiz: Quizzes[] };
  quizPage = 'QuizPage';
  quiz : Quizzes;
  nature = 'application';

  applicationQuiz: Quizzes[] = [];
  speedQuiz: Quizzes[] = [];
  memoryQuiz: Quizzes[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private quizService: QuizService,
              private quizStore: QuizStoreProvider) {
  }

  ngOnInit() {
    this.quizStore.loadSolvedQuizzes();
    this.chapters = this.navParams.data;

  }

  ionViewDidLoad() {

    //division by nature
    for(let i=this.chapters.quiz.length-1; i >= 0; i--){
      let quizEl = this.chapters.quiz[i];
      if(quizEl.nature === 'application'){
        this.applicationQuiz.push(quizEl);
      }else if(quizEl.nature === 'speed'){
        this.speedQuiz.push(quizEl);
      }else if(quizEl.nature === 'memory'){
        this.memoryQuiz.push(quizEl);
      }
    }
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
