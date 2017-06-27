import { GlobalsProvider } from './globals/globals';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Quiz } from "../data/quiz.interface";
import quiz from '../data/quiz';
import quizLibrary from '../data/quiz-library';

@Injectable()
export class QuizService {

  libraryCollection: any;
  quizCollection: Quiz[];
  data: any;
  quizData: any;
  constructor(public http: Http, private g: GlobalsProvider) {
    this.data = null;
  }


  //ANALYSIS QUIZ HERE!!
  loadQuiz(token: string) {
    return this.http.get(this.g.firebase_url+'quizdb.json?auth=' + token)
      .map((res) => res.json())
      .do((data) => {
        this.data = data;
      });

  }

  //COMPLETE QUIZ LIBRARY HERE PUT
  loadQuizLibrary() {
    this.libraryCollection = quizLibrary;
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      this.http.put(this.g.firebase_url+'quiz-library.json', this.libraryCollection)
        .map(res => res.json())
        .subscribe(() => {
          console.log("Success!");
        },
        (error) => {
          console.log(error.json());
        });
    });

  }

  //COMPLETE QUIZ LIBRARY HERE GET
  getQuizLibrary(token: string) {
    return this.http.get(this.g.firebase_url+'quiz-library.json?auth=' + token)
      .map((res) => res.json())
      .do((data) => {
        this.data = data;
      });
  }


}
