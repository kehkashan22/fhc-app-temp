import { RateServiceProvider } from './../../providers/rate-service/rate-service';
import { AuthProvider } from './../../providers/auth';
import { NotificationsProvider } from './../../providers/notifications/notifications';
import { FirstProvider } from './../../providers/first/first';
import { AnalyseStoreProvider } from './../../providers/analyse-store/analyse-store';
import { NetworkProvider } from './../../providers/network/network';
import { QuizStoreProvider } from './../../providers/quiz-store';
import { User } from './../../data/user.interface';
import { UserProvider } from './../../providers/user';
import { VideosService } from './../../providers/fav-videos';
<<<<<<< HEAD
import { VideosProvider } from './../../providers/videos';
import { Component  } from '@angular/core';
import { NavController, IonicPage, Events, MenuController, LoadingController, App } from 'ionic-angular';
=======
import { Component, } from '@angular/core';
import { NavController, IonicPage, Events, LoadingController, App, MenuController } from 'ionic-angular';
>>>>>>> Kehkashan
import { Quiz } from "../../data/quiz.interface";
import * as firebase from 'firebase';

import { AngularFireDatabase } from 'angularfire2/database';
import { FCM } from '@ionic-native/fcm';

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
  announcements = 'AnnouncementsPage'
  quizCollection: Quiz[];
  imgPath = "https://s3-ap-southeast-1.amazonaws.com/fhc.app/";
  imgType = ".jpeg";
  userData: User;
<<<<<<< HEAD

  diff: number = 0;

  announcements: Array<any> = [];

=======
  notificationNum: number = 0;
  show = true;
>>>>>>> Kehkashan
  fireStore = firebase.database().ref("/pushtokens");
  notifNum: number = 0;

  slides: any[] = [
    { url: "assets/images/slidequiz.png", text: "Test Slide1" },
    { url: "assets/images/slideranalyse.png", text: "Test Slide2" },
    { url: "assets/images/slidernotification.png", text: "Test Slide3" },
    { url: "assets/images/slidervideo.png", text: "Test Slide3" }
  ];

  constructor(public navCtrl: NavController,
    private _auth: AuthProvider,
    private _videosStore: VideosService,
    private _quizStore: QuizStoreProvider,
    private _user: UserProvider,
    private events: Events,
    private _loader: LoadingController,
    private app: App,
    private fcm: FCM,
    private _network: NetworkProvider,
    private _analysed: AnalyseStoreProvider,
    private _launch: FirstProvider,
    private _note: NotificationsProvider,
    private _menu: MenuController,
    private _rate: RateServiceProvider
  ) {
    this._menu.enable(true);
    this.fcm.getToken().then((token) => {
      this.storeToken(token);
    },
      (err) => {
        console.log(err);
      });

  }

  ngOnInit() {
    this._launch.loadLaunchCount();
    this._note.loadNote();
    console.log("OnInit Home");
  }

  ionViewDidLoad() {
    if (!this.userData) {
      this._videosStore.loadFavoriteVideos();
      this._quizStore.loadSolvedQuizCollection();
      this._analysed.loadSolved();
      if (this._network.noConnection()) {
        console.log(this._network.noConnection());
      this._network.showNetworkAlert();
    } else {
      this._user.getUser().then((data: User) => {
        this.userData = data;
        //publish user data to an Event which is published in app.components.ts to fetch user data for side menu
        this.events.publish('user:created', this.userData);
      });
    }
    }

    this.fcm.onNotification().subscribe((data) => {
    this._note.setNote(true);
    this.show = true;
    if (data.wasTapped) {
      console.log('Data TAPPED');
      this.navigateToAnnouncements();
    } else {
      console.log(JSON.stringify(data));
    }
    });

     this.fcm.onTokenRefresh().subscribe(token => {
      this.storeToken(token);
    });

  }

  ionViewDidEnter(){
    this._rate.appRate.promptForRating(false);
  }

  toAnalysisPage() {
    this.navCtrl.push(this.analyseMePage);
  }

  navigateToAnnouncements() {
    this._note.setNote(false);
    this.navCtrl.push('AnnouncementsPage');
    this.diff = 0;
  }

  emittedDifference(difference: number){
    console.log('Difference in home page',difference);
    this.diff = difference;
  }

  storeToken(token) {
    this.fireStore.child(firebase.auth().currentUser.uid).set({
      uid: firebase.auth().currentUser.uid,
      devToken: token
    }).then(() => {
<<<<<<< HEAD
      console.log('Token stored');
=======
      console.log('Token Stored');
>>>>>>> Kehkashan
    }).catch((err) => {
      console.log(err);
    });
  }




}
