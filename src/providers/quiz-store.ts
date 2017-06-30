import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { ToastController } from "ionic-angular";
import { Quizzes } from "../data/quizzes.interface";

@Injectable()
export class QuizStoreProvider {
  private quiz: Quizzes[] = [];

  constructor(private storage: Storage,
    private toastCtrl: ToastController) { }

  addQuizAsSolved(quiz: Quizzes) {
    // if (!this.isQuizSolved(quiz)) { //check if quiz does not already exist, then push
      this.quiz.push(quiz);
      this.storage.set('quizzes', this.quiz)
        .then()
        .catch(
        err => {
          this.quiz.splice(this.quiz.indexOf(quiz), 1);
        }
        );
    // }

  }

  removeQuizFromSolved(quiz: Quizzes) {
    const position = this.quiz.findIndex((quizEl: Quizzes) => {
      return quizEl.quizId === quiz.quizId;
    });
    this.quiz.splice(position, 1);
    this.storage.set('quizzes', this.quiz)
      .then()
      .catch(
      err => {
        this.quiz.push(quiz);
      }
      );
  }

  getSolvedQuizzes() {
    return this.quiz.slice();
  }

  getSolvedQuiz(quiz: Quizzes) {
    let quizElement: Quizzes = this.quiz.find((quizEl: Quizzes) => {
      return quizEl.quizId == quiz.quizId;
    });
    return quizElement;
  }

  isQuizSolved(quiz: Quizzes) {
    return this.quiz.find((quizEl: Quizzes) => {
      return quizEl.quizId == quiz.quizId;
    });
  }

  loadSolvedQuizzes() {
    this.storage.get('quizzes')
      .then(
      (quizzes: Quizzes[]) => {
        this.quiz = quizzes != null ? quizzes : [];
        console.log(this.quiz);
      }
      )
      .catch(
      err => {
        let toast = this.toastCtrl.create({
          message: 'Could not load list of solved quizzes. Please try again!',
          duration: 3000,
          position: 'middle'
        });

        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });

        toast.present();
      }
      );
  }


}
