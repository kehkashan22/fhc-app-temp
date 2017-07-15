import { QuizStoreProvider } from './../../providers/quiz-store';
import { User } from './../../data/user.interface';
import { AuthProvider } from './../../providers/auth';
import { UserProvider } from './../../providers/user';
import { QuizService } from './../../providers/quiz';
import { VideosService } from './../../providers/fav-videos';
import { VideosProvider } from './../../providers/videos';
import { Component,  } from '@angular/core';
import { NavController, IonicPage, Events, MenuController, LoadingController, App, NavParams } from 'ionic-angular';
import { Quiz } from "../../data/quiz.interface";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: []
})
export class HomePage {
  analysisPage = 'AnalysisPage';
  libraryPage = 'LibraryPage';
  quizPage = 'QuizPage';
  analyseMePage = 'AnalyseMePage';
  rootLibraryPage = 'RootLibraryPage';
  quizLibraryPage = 'QuizLibraryPage';
  reportCardPage = 'ReportCardPage';
  quizCollection : Quiz[];
  imgPath = "https://s3-ap-southeast-1.amazonaws.com/fhc.app/";
  imgType = ".jpeg";
  userData: User;

  slides:any[]=[
              {url: this.imgPath + "slides4.jpg", text: "Test Slide1"},
              {url: this.imgPath + "slides2.jpg", text: "Test Slide2"},
              {url: this.imgPath + "slides5.jpg", text: "Test Slide3"}
              ];

  constructor(public navCtrl: NavController,
               private videosProvider: VideosProvider,
               private videosService: VideosService,
               private quizService: QuizService,
               private quizStore: QuizStoreProvider,
               private userProvider : UserProvider,
               private events : Events,
               private menuCtrl: MenuController,
               private authProvider : AuthProvider,
               private _loader : LoadingController,
               private quizProvider: QuizService,
               private app : App){}

  ngOnInit() {
   this.videosService.loadFavoriteVideos();
   this.quizStore.loadSolvedQuizCollection();
   //this.quizProvider.putAnalysis();

  }

  ionViewDidLoad(){
    const loader = this._loader.create({
      spinner: "bubbles",
      content: "Loading..."
    });
    if(!this.userData){
      loader.present();
    }
    this.authProvider.getActiveUser().getIdToken().then((token: string) => {
      this.userProvider.getUser(token).subscribe((data) => {
           this.userData = data;
           //publish user data to an Event which is published in app.components.ts to fetch user data for side menu
            this.events.publish('user:created', this.userData);
            loader.dismiss();
       });
    });

  }

  onPageWillEnter(){
        console.log('****on page will enter messages pane');

    }

    toAnalysisPage(){
      this.navCtrl.push(this.analyseMePage, {
        // analysisBy: 'subject',
        // analysisId: 'dt'
        subjectId: 'dt'
      });
    }
}
