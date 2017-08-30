import { GlobalsProvider } from './globals/globals';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Quiz } from "../data/quiz.interface";

import * as firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';

@Injectable()
export class QuizService {

  libraryCollection: any;
  quizLib2: any;
  quizCollection: Quiz[];
  data: any;
  quizData: any;
  constructor(public http: Http, private g: GlobalsProvider) {
    this.data = null;
  }


  //ANALYSIS QUIZ HERE!!
  loadQuiz() {
    return new Promise((resolve, reject) => {
      firebase.database()
        .ref('/quizdb').on('value', snapshot => {
          resolve(snapshot.val());
        });
    });
  }

  //ANALYSIS ANSWERS HERE
  loadQuizAnswers() {
    return new Promise((resolve, reject) => {
      firebase.database()
        .ref('/answersdb').on('value', snapshot => {
          resolve(snapshot.val());
        });
    });
  }



  //COMPLETE QUIZ LIBRARY HERE GET
  getQuizLibrary(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.database()
        .ref(url).child('/chapters').on('value', snapshot => {
          resolve(snapshot.val());
        });
    });
  }


}
