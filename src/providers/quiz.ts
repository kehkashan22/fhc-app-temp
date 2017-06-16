import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Quiz } from "../data/quiz.interface";
import quiz from '../data/quiz';

@Injectable()
export class QuizService {

  quizCollection: Quiz[];
  data: any;
  quizData: any;
  constructor(public http: Http) {
    this.data = null;
  }

  loadQuiz(token : string){

    return this.http.get('https://ionic-fhc-app.firebaseio.com/quizdb.json?auth=' + token)
      .map((res) => res.json())
      .do((data) => {
        this.data = data;
    });

    // if (this.data) {
    //   return Promise.resolve(this.data);
    // }

    // return new Promise(resolve => {

    //   this.http.get('https://ionic-fhc-app.firebaseio.com/quizdb.json')
    //     .map(res => res.json())
    //     .subscribe(data => {
    //       this.data = data;
    //       resolve(this.data);
    //     });
    // });

  }

  setQuiz(quizData){
      if(quizData){
        this.quizCollection = quizData;
      }
  }

  getQuiz(){
      return this.quizCollection;
  }

}
