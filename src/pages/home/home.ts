import { QuizService } from './../../services/quiz';
import { QuizPage } from './../quiz/quiz';
import { VideosService } from './../../services/videos';
import { VideosProvider } from './../../providers/videos';
import { AnalysisPage } from './../analysis/analysis';
import { Component,  } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { LibraryPage } from "../library/library";
import { Quiz } from "../../data/quiz.interface";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: []
})
export class HomePage {
  analysisPage = AnalysisPage;
  libraryPage = LibraryPage;
  quizPage = QuizPage;
  quizCollection : Quiz[];
  imgPath = "assets/img/"
  imgType = ".jpeg"
  slides:any[]=[
              {url: this.imgPath + "slide1.jpg", text: "Test Slide1"},
              {url: this.imgPath + "slide2.jpg", text: "Test Slide2"},
              {url: this.imgPath + "slide3.jpg", text: "Test Slide3"}
              ];

  constructor(public navCtrl: NavController,
               private videosProvider: VideosProvider,
               private videosService: VideosService,
               private quizService: QuizService) {}

  ngOnInit() {
    this.videosService.loadFavoriteVideos();
    this.quizService.loadQuiz().then((data: Quiz[]) => {
       this.quizCollection = data;
        this.quizService.setQuiz(this.quizCollection);
     });
  }

  ionViewDidLoad(){

     this.videosProvider.getVideos().then((data) => {
       console.log(data);
     });



  }

  onGoToVideos(){
    this.navCtrl.push(this.libraryPage)
      .catch((error) => console.log('Access denied, Argument was ' + error));
  }

  goToQuiz(){
    console.log("============================================QUIZ============================================");
     console.log(this.quizCollection);
     this.navCtrl.push(this.quizPage)
       .catch((error) => console.log('Access denied, Argument was ' + error));
  }
}