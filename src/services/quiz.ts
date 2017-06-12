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

  // loadQuiz(){
  //   this.quizCollection = quiz;
  //   if (this.data) {
  //     return Promise.resolve(this.data);
  //   }

  //   return new Promise(resolve => {

  //     this.http.put('https://ionic-fhc-app.firebaseio.com/quizdb.json', this.quizCollection)
  //       .map(res => res.json())
  //       .subscribe(() => {
  //         console.log("Success!");
  //       },
  //       (error)=>{
  //         console.log(error.json());
  //       });
  //   });

  // }

  loadQuiz(){

    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.http.get('https://ionic-fhc-app.firebaseio.com/quizdb.json')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });

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
