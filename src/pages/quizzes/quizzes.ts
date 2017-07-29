import { QuizStoreProvider } from './../../providers/quiz-store';
import { Quizzes } from './../../data/quizzes.interface';
import { QuizService } from './../../providers/quiz';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { QuizStore } from "../../data/quiz/quiz-store.interface";
import { Chapter } from "../../data/chapter.interface";

@IonicPage()
@Component({
  selector: 'page-quizzes',
  templateUrl: 'quizzes.html',
})
export class QuizzesPage implements OnInit {

  chapter: Chapter;
  subjectId: string;
  chapterType: string;
  quizPage = 'QuizPage';
  analysisPage = 'AnalysisPage';
  quiz: Quizzes;
  nature = 'memory';

  applicationQuiz: Quizzes[] = [];
  speedQuiz: Quizzes[] = [];
  memoryQuiz: Quizzes[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private quizService: QuizService,
    private quizStore: QuizStoreProvider,
    private modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.quizStore.loadSolvedQuizCollection();
    this.chapter = this.navParams.get('chapter');
    this.subjectId = this.navParams.get('subjectId');
  }

  ionViewDidLoad() {

    //division by nature
    if (this.chapter) {
      for (let i = this.chapter.quiz.length - 1; i >= 0; i--) {
        let quizEl = this.chapter.quiz[i];
        if (quizEl.nature === 'application') {
          this.applicationQuiz.push(quizEl);
        } else if (quizEl.nature === 'speed') {
          this.speedQuiz.push(quizEl);
        } else if (quizEl.nature === 'memory') {
          this.memoryQuiz.push(quizEl);
        }
      }
    }

  }

  toQuiz(quiz: Quizzes) {
    this.quiz = quiz;
    this.navCtrl.push(this.quizPage, {
      subjectId: this.subjectId,
      chapterId: this.chapter.chapterId,
      chapterType: this.chapter.chapterType,
      quiz: this.quiz,
      isSolved: this.isSolved(quiz) ? true : false
    });
  }

  isSolved(quiz: Quizzes) {
    let quizStore: QuizStore = {
      subjectId: this.subjectId,
      chapterId: this.chapter.chapterId,
      chapterType: this.chapter.chapterType,
      quiz: quiz
    }
    return this.quizStore.isQuizStoreSolved(quizStore);
  }

  toAnalysis() {
   const modal = this.modalCtrl.create(this.analysisPage, {
      analysisId: this.chapter.chapterId
    });
    modal.present();
    modal.onDidDismiss(() => {

    });
  }
}
