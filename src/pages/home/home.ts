import { QuizStoreProvider } from './../../providers/quiz-store';
import { User } from './../../data/user.interface';
import { AuthProvider } from './../../providers/auth';
import { UserProvider } from './../../providers/user';
import { QuizService } from './../../providers/quiz';
import { VideosService } from './../../providers/fav-videos';
import { VideosProvider } from './../../providers/videos';
import { Component,  } from '@angular/core';
import { NavController, IonicPage, Events, MenuController, LoadingController, App } from 'ionic-angular';
import { Quiz } from "../../data/quiz.interface";

import * as firebase from 'firebase';

import { AngularFireDatabase } from 'angularfire2/database';

//declare var FCMPlugin;

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
  quizCollection : Quiz[];
  imgPath = "assets/img/";
  imgType = ".jpeg";
  userData: User;

  diff: number = 0;

//  fireStore = firebase.database().ref("/pushtokens");

  slides:any[]=[
              {url: this.imgPath + "slide1.jpg", text: "Test Slide1"},
              {url: this.imgPath + "slide2.jpg", text: "Test Slide2"},
              {url: this.imgPath + "slide3.jpg", text: "Test Slide3"}
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
               private loader : LoadingController,
               private app : App,
               private afd: AngularFireDatabase           
    ){
      //   this.tokenSetup().then((token) => {
     //     this.storeToken(token);
    //    });              
  }

  ngOnInit() {
   this.videosService.loadFavoriteVideos();
    // this.quizService.loadQuizLibrary().then((data) => {
    //    console.log(data);
    //  });
    // this.videosProvider.loadLibrary().then((data) => {
    //    console.log(data);
    //  });

  }

  ionViewDidLoad(){
    this.authProvider.getActiveUser().getIdToken().then((token: string) => {
      this.userProvider.getUser(token).subscribe((data) => {
           this.userData = data;
           //publish user data to an Event which is published in app.components.ts to fetch user data for side menu
            this.events.publish('user:created', this.userData);
       });
    });
 /*   FCMPlugin.onNotification((data) => {
      
      if(data.wasTapped){
        var self = this;
        //self.navCtrl.setRoot('Home');
        self.navCtrl.setRoot('AnnouncementsPage');
      }else{
        alert( JSON.stringify(data) );
      }
    });

    FCMPlugin.onTokenRefresh((token) => {
      this.storeToken(token);
    });
*/
  }

  onPageWillEnter(){
        console.log('****on page will enter messages pane');

  }

  navigateToAnnouncements(){
    this.navCtrl.push('AnnouncementsPage');
  }

  emittedDifference(difference: number){
    console.log('Difference in home page',difference);
  }

 /* storeToken(token){
    this.fireStore.child(firebase.auth().currentUser.uid).set({
      uid: firebase.auth().currentUser.uid,
      devToken: token
    }).then(() => {
      alert('Token Stored');
    }).catch((err) => {
      alert(err);
    });
  }
  tokenSetup(){
    var promise = new Promise((resolve, reject) => {
      FCMPlugin.getToken((token) => {
        resolve(token);
      }, (err) => {
        reject(err);
      });
      
    });
    return promise;
  }*/
}
