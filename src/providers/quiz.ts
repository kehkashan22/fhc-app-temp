import { GlobalsProvider } from './globals/globals';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Quiz } from "../data/quiz.interface";
import quiz from '../data/quiz';
import quizLib from '../data/quiz-lib-2';
import quizLibrary from '../data/quiz-library';

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

// putAnalysis() {
//   const quizEl = quiz;
//   if (this.data) {
//     return Promise.resolve(this.data);
//   }
//   return new Promise(resolve => {
//     this.http.put(this.g.firebase_url+'quizdb.json', quizEl)
//       .map(res => res.json())
//       .subscribe(() => {
//         console.log("Success!");
//       },
//       (error) => {
//         console.log(error.json());
//       });
//   });

// }

// //COMPLETE QUIZ LIBRARY HERE PUT
// loadQuizLibrary(url) {
//   this.libraryCollection = quizLibrary;
//   //this.quizLib2 = quizLib;
//   if (this.data) {
//     return Promise.resolve(this.data);
//   }
//   return new Promise((resolve, reject) => {
//     firebase.database()
//       .ref(url).on('value', snapshot => {
//         resolve(snapshot.val());
//       });
//   });

// }

//COMPLETE QUIZ LIBRARY HERE GET
getQuizLibrary(url: string): Promise < any > {
  return new Promise((resolve, reject) => {
    firebase.database()
      .ref(url).child('/chapters').on('value', snapshot => {
        resolve(snapshot.val());
      });
  });
}
}
