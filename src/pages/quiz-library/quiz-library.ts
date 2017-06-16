import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { VideoPlayer } from "@ionic-native/video-player";
import { QuizService } from "../../providers/quiz";
import { AuthProvider } from "../../providers/auth";
import { Quiz } from "../../data/quiz.interface";

@IonicPage()
@Component({
  selector: 'page-quiz-library',
  templateUrl: 'quiz-library.html',
})
export class QuizLibraryPage implements OnInit{

  quizCollection: Quiz[];
  analysisPage: 'AnalysisPage';

  constructor(public navCtrl: NavController,
              private videoPlayer: VideoPlayer,
              private quizService: QuizService,
              private authProvider: AuthProvider,
              private loader : LoadingController) {
  }

  ionViewDidLoad() {
  }

  ngOnInit(){
    const loader = this.loader.create({
      spinner: 'bubbles',
      content: "Loading Quiz..."
    });
    loader.present();
    this.authProvider.getActiveUser().getIdToken().then((token: string) => {
      this.quizService.loadQuiz(token).subscribe((data: Quiz[]) => {
        setTimeout(() => {
          loader.dismiss();
        }, 1000);
        this.quizCollection = data;
      });
    },
    error => {
      console.log(error);
    });
  }

  // toQuiz(){
  //   this.navCtrl.push(this.quizPage, this.quizCollection);
  // }
}
