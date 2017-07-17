import { QuizStore } from './../data/quiz/quiz-store.interface';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { ToastController } from "ionic-angular";
import { Quizzes } from "../data/quizzes.interface";
import _ from "lodash";

@Injectable()
export class QuizStoreProvider {

  private quizCollection: QuizStore[] = [];

  // private quizBySubject:QuizStore[] = [];

  // private quizByChapter: QuizStore[] = [];

  constructor(private storage: Storage,
    private toastCtrl: ToastController) { }

  // addQuizAsSolved(quiz: Quizzes) {
  //   // if (!this.isQuizSolved(quiz)) { //check if quiz does not already exist, then push
  //     this.quiz.push(_.cloneDeep(quiz));
  //     this.storage.set('quizzes', this.quiz)
  //       .then()
  //       .catch(
  //       err => {
  //         this.quiz.splice(this.quiz.indexOf(quiz), 1);
  //       }
  //       );
  //   // }

  // }

  //   removeQuizFromSolved(quizElement: Quizzes) {
  //   const position = this.quiz.findIndex((quizEl: Quizzes) => {
  //     return quizEl.quizId === quizElement.quizId;
  //   });
  //   this.quiz.splice(position, 1);
  //   this.storage.set('quizzes', this.quiz)
  //     .then()
  //     .catch(
  //     err => {
  //       this.quiz.push(quizElement);
  //     }
  //     );
  // }


  addToQuizCollection(quizStore: QuizStore) {
      this.quizCollection.push(quizStore);
      this.storage.set('quizCollection', this.quizCollection)
        .then()
        .catch(
        err => {
          this.quizCollection.splice(this.quizCollection.indexOf(quizStore), 1);
        }
        );
  }

  removefromQuizCollection(quizStore: QuizStore) {
    const position = this.quizCollection.findIndex((quizStoreEl: QuizStore) => {
      return (quizStoreEl.quiz.quizId).toLowerCase() === (quizStore.quiz.quizId).toLowerCase();
    });
    this.quizCollection.splice(position, 1);
    this.storage.set('quizCollection', this.quizCollection)
      .then()
      .catch(
      err => {
        this.quizCollection.push(quizStore);
      }
      );
  }


  // getSolvedQuizzes() {
  //   return _.cloneDeep(this.quiz);
  // }

  getSolvedQuizCollection() { //full array
    return _.cloneDeep(this.quizCollection);
  }

  getQuizByChapter(chapterId: string): QuizStore[]{
    let quizByChapter: QuizStore[] = [];
    for(let i = 0; i < this.quizCollection.length; i++){
      if((this.quizCollection[i].chapterId).toLowerCase()===chapterId.toLowerCase()){
        quizByChapter.push(this.quizCollection[i]);
      }
    }
    return quizByChapter;
  }

  getQuizBySubject(subjectId: string): QuizStore[]{
    let quizBySubject: QuizStore[] = [];
    for(let i = 0; i < this.quizCollection.length; i++){
      if((this.quizCollection[i].subjectId).toLowerCase()===subjectId.toLowerCase()){
        quizBySubject.push(this.quizCollection[i]);
      }
    }
    return quizBySubject;
  }

  getSolvedQuizFromStore(quizStore: QuizStore) { //one
    let quizElement: QuizStore = this.quizCollection.find((quizEl: QuizStore) => {
      return quizEl.quiz.quizId == quizStore.quiz.quizId;
    });
    return quizElement.quiz;
  }

  // isQuizSolved(quiz: Quizzes) {
  //   return this.quiz.find((quizEl: Quizzes) => {
  //     return quizEl.quizId == quiz.quizId;
  //   });
  // }

  isQuizStoreSolved(quizStore: QuizStore) { //one
    return this.quizCollection.find((quizEl: QuizStore) => {
      return quizEl.quiz.quizId == quizStore.quiz.quizId;
    });
  }

  // loadSolvedQuizzes() {
  //   this.storage.get('quizzes')
  //     .then(
  //     (quizzes: Quizzes[]) => {
  //       this.quiz = quizzes != null ? quizzes : [];
  //       console.log(this.quiz);
  //     }
  //     )
  //     .catch(
  //     err => {
  //       let toast = this.toastCtrl.create({
  //         message: 'Could not load list of solved quizzes. Please try again!',
  //         duration: 3000,
  //         position: 'middle'
  //       });

  //       toast.onDidDismiss(() => {
  //         console.log('Dismissed toast');
  //       });

  //       toast.present();
  //     }
  //     );
  // }

  loadSolvedQuizCollection() {
    this.storage.get('quizCollection')
      .then(
      (quizStore: QuizStore[]) => {
        this.quizCollection = quizStore != null ? quizStore : [];
        console.log(this.quizCollection);
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
