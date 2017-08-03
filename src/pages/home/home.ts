import { FirstProvider } from './../../providers/first/first';
import { AnalyseStoreProvider } from './../../providers/analyse-store/analyse-store';
import { NetworkProvider } from './../../providers/network/network';
import { Badge } from '@ionic-native/badge';
import { QuizStoreProvider } from './../../providers/quiz-store';
import { User } from './../../data/user.interface';
import { AuthProvider } from './../../providers/auth';
import { UserProvider } from './../../providers/user';
import { QuizService } from './../../providers/quiz';
import { VideosService } from './../../providers/fav-videos';
import { VideosProvider } from './../../providers/videos';
import { Component, } from '@angular/core';
import { NavController, IonicPage, Events, MenuController, LoadingController, App } from 'ionic-angular';
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
  notificationNum: number = 0;

  pop="all";
  fireStore = firebase.database().ref("/pushtokens");

  slides: any[] = [
    { url: this.imgPath + "slides4.jpg", text: "Test Slide1" },
    { url: this.imgPath + "slides2.jpg", text: "Test Slide2" },
    { url: this.imgPath + "slides5.jpg", text: "Test Slide3" }
  ];

  constructor(public navCtrl: NavController,
    private _videosStore: VideosService,
    private _quizStore: QuizStoreProvider,
    private _user: UserProvider,
    private events: Events,
    private _loader: LoadingController,
    private app: App,
    private afd: AngularFireDatabase,
    private fcm: FCM,
    private badge: Badge,
    private _network: NetworkProvider,
    private _analysed: AnalyseStoreProvider,
    private _launch: FirstProvider
  ) {
    this.fcm.getToken().then((token) => {
      this.storeToken(token);
    },
      (err) => {
        console.log(err);
      });

  }

  ngOnInit() {
    this.requestPermission();
    this._launch.loadLaunchCount();
    this.getBadges();

  }

  ionViewDidLoad() {
    const loader = this._loader.create({
      spinner: "bubbles",
      content: 'Please wait while we finish loading...',
      duration: 3000
    });
    if (!this.userData) {
      loader.present();
      this._videosStore.loadFavoriteVideos();
      this._quizStore.loadSolvedQuizCollection();
      this._analysed.loadSolved();
      if (this._network.noConnection()) {
        console.log(this._network.noConnection());
      loader.dismiss();
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
      this.badge.increase(1).then((badge) => {
        this.notificationNum = badge;
      });
      if (data.wasTapped) {
        const self = this;
        //self.navCtrl.setRoot('Home');
        self.navCtrl.setRoot('AnnouncementsPage');
        alert('Data TAPPED');
      } else {
        alert(JSON.stringify(data));
      }
    });

    this.fcm.onTokenRefresh().subscribe(token => {
      this.storeToken(token);
    });

  }

  toAnalysisPage() {
    this.navCtrl.push(this.analyseMePage);
  }

  navigateToAnnouncements() {
    this.badge.clear().then(() => { });
    this.getBadges();
    this.navCtrl.push('AnnouncementsPage');
  }

  storeToken(token) {
    this.fireStore.child(firebase.auth().currentUser.uid).set({
      uid: firebase.auth().currentUser.uid,
      devToken: token
    }).then(() => {
      //alert('Token Stored');
    }).catch((err) => {
      alert(err);
    });
  }

  async requestPermission() {
    try {
      let hasPermission = await this.badge.hasPermission();
      if (!hasPermission) {
        await this.badge.registerPermission();
      }
    } catch (e) {
      console.error(e);
    }
  }

  async getBadges() {
    try {
      this.notificationNum = await this.badge.get();
    } catch (e) {
      console.error(e);
    }
  }
}
