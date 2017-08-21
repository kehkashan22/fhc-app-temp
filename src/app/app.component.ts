
import { Component, ViewChild, NgZone } from '@angular/core';
import { Platform, NavController, ModalController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AuthProvider } from "../providers/auth";
import { Md5 } from 'ts-md5/dist/md5';
import { LoadingController, App } from 'ionic-angular';
import { UserProvider } from './../providers/user';

import * as firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any ;
  //= 'IntroSlider'
  zone: NgZone;

  pages: Array<{title: string, component: any, icon: string}>;

  homePage = 'HomePage';
  profilePage = 'ProfilePage';
  settingsPage = 'SettingsPage';
  starredPage = 'StarredPage';
  aboutPage = 'AboutPage';
  rootLibraryPage = 'RootLibraryPage';
  contactPage = 'ContactPage';
  fullname = 'Loading...';
  email = '';
  profilePicture = 'assets/images/notif.jpg';

  // used for an example of ngFor and navigation


  @ViewChild('nav') nav: NavController;
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private afAuth: AngularFireAuth,
    private menuCtrl: MenuController,
    private iab: InAppBrowser,
    private userProvider: UserProvider,
    private events: Events,
    private loader: LoadingController,
    public authProvider: AuthProvider,
    private app: App) {


    this.zone = new NgZone({});
    //Angular Authentication

    platform.ready().then(() => {

      const authObserver = afAuth.authState.subscribe(user => {
        this.zone.run(() => {
          if (user) {
            this.authProvider.setLoginStatus(true);
            this.rootPage = 'HomePage';
            authObserver.unsubscribe();
          } else {
            this.authProvider.setLoginStatus(false);
            console.log(this.authProvider.getLoginStatus());
            this.rootPage = 'LoginWithEmailPage';
            authObserver.unsubscribe();
          }
        });
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.backgroundColorByHexString('#005C9C');
      splashScreen.hide();
    });

    this.pages = [
      { title: 'Home', component: this.homePage, icon: 'home'},
      { title: 'Video Library', component: 'RootLibraryPage', icon: 'book'},
      { title: 'Starred Videos', component: 'StarredPage', icon: 'star'},
      { title: 'Quiz Library', component: 'QuizLibraryPage', icon: 'school'},
      { title: 'Notifications', component: 'AnnouncementsPage', icon: 'notifications'},
      { title: 'Store', component: 'store', icon: 'cart'},
      { title: 'Contact Us', component: 'ContactPage', icon: 'help-circle'},
      { title: 'About', component: 'AboutPage', icon: 'pulse'},
      { title: ' Logout', component: 'logout', icon: 'log-out'},
    ];



    this.events.subscribe('user:created', (user) => {
      // user captured on first entry
      this.fullname = user.fullName;
      this.email = user.emailId;
      this.profilePicture = "https://www.gravatar.com/avatar/" +
        Md5.hashStr(this.email.toLowerCase()) +"?d=https%3A%2F%2Fs3-ap-southeast-1.amazonaws.com%2Ffhc.app%2Fprofile.png";
    });

    console.log(this.profilePicture);
  }

  onLoad(page: any) {
    if(page === 'store'){
      this.goToStore();
      this.menuCtrl.close();
    }else if(page === 'logout'){
      this.logout();
    }else if(page === this.homePage){
      this.nav.setRoot(page);
      this.menuCtrl.close();
    }else{
      this.nav.push(page);
      this.menuCtrl.close();
    }
  }

  goToStore() {
    this.iab.create('http://www.fhconline.in/', "_system", "location=yes");
  }

  logout() {

    const loading = this.loader.create({
      spinner: 'bubbles',
      content: 'Signing you out...'
    });
    loading.present();
    firebase.database().ref('/pushtokens').child(firebase.auth().currentUser.uid).remove();

    this.authProvider.logout().then(() => {

      setTimeout(() => {
        loading.dismiss();
      }, 3000);
      this.menuCtrl.close();
      setTimeout(() => {
        this.nav.setRoot('LoginWithEmailPage');
      }, 3000);

    });
  }

}

