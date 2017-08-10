import { AuthProvider } from './../../providers/auth';
import { NotificationsProvider } from './../../providers/notifications/notifications';
import { FirstProvider } from './../../providers/first/first';
import { AnalyseStoreProvider } from './../../providers/analyse-store/analyse-store';
import { NetworkProvider } from './../../providers/network/network';
import { QuizStoreProvider } from './../../providers/quiz-store';
import { User } from './../../data/user.interface';
import { UserProvider } from './../../providers/user';
import { VideosService } from './../../providers/fav-videos';
import { Component, } from '@angular/core';
import { NavController, IonicPage, Events, LoadingController, App, MenuController } from 'ionic-angular';
import { Quiz } from "../../data/quiz.interface";

import * as firebase from 'firebase';

import { AngularFireDatabase } from 'angularfire2/database';
import { FCM } from '@ionic-native/fcm';
import { Badge } from "@ionic-native/badge";

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
  show;
  fireStore = firebase.database().ref("/pushtokens");
  notifNum: number = 0;

  slides: any[] = [
    { url: this.imgPath + "slidequiz.png", text: "Test Slide1" },
    { url: this.imgPath + "slidequiz.png", text: "Test Slide2" },
    { url: this.imgPath + "slidequiz.png", text: "Test Slide3" }
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
    private badge: Badge
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
    this.badge.get().then(badge => {
      this.notifNum = badge;
    });
  }


  ionViewCanEnter(): boolean{
    return this._auth.getLoginStatus() ? true : false;
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
    this.badge.increase(1).then((badge) => {
      console.log("Badge number"+badge);
      this.notifNum = badge+1;
    });
    this._note.setNote(true);
    this.show = true;
    console.log(this.show);
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

  toAnalysisPage() {
    this.navCtrl.push(this.analyseMePage);
  }

  navigateToAnnouncements() {
    this.show = false;
    this._note.setNote(false);
    this.badge.clear().then(data => {
      if(data){
        this.notifNum = 0;
      }
    });
    this.navCtrl.push('AnnouncementsPage');
  }

  storeToken(token) {
    this.fireStore.child(firebase.auth().currentUser.uid).set({
      uid: firebase.auth().currentUser.uid,
      devToken: token
    }).then(() => {
      console.log('Token Stored');
    }).catch((err) => {
      console.log(err);
    });
  }




}
