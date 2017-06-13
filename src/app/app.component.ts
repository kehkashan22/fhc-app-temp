import { Md5 } from 'ts-md5/dist/md5';
import { UserProvider } from './../providers/user';
import { Component, ViewChild} from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';

declare var FCMPlugin;

@Component({
  templateUrl: 'app.html'
})
export class MyApp{

   rootPage:any = 'IntroSlider';
   homePage = 'HomePage'
	 profilePage = 'ProfilePage';
	 settingsPage = 'SettingsPage';
	 starredPage = 'StarredPage';
	 aboutPage = 'AboutPage';
	 libraryPage= 'LibraryPage';
	 contactPage = 'ContactPage';
   fullname = 'User';
   email = 'user@gmail.com';
   profilePicture = "https://www.gravatar.com/avatar/";

	@ViewChild('nav') nav: NavController;
  constructor(
              platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private afAuth: AngularFireAuth,
			        private menuCtrl : MenuController,
              private iab: InAppBrowser,
              private userProvider : UserProvider,
              private events : Events
    ) {
    platform.ready().then(() => {

      //Angular Authentication
      const authObserver = afAuth.authState.subscribe( user => {
        if(user) {
          this.rootPage = 'HomePage';
        }else{
          this.rootPage = 'LoginWithEmailPage';
        }
        authObserver.unsubscribe();
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.backgroundColorByHexString('#00BFE5');
      splashScreen.hide();
    });

    this.events.subscribe('user:created', (user) => {
        // user captured on first entry
        this.fullname = user.fullName;
        this.email = user.emailId;
        this.profilePicture = "https://www.gravatar.com/avatar/" +
                                          Md5.hashStr(this.email.toLowerCase())
    });
  }

  ionViewDidLoad(){

  }
  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  goToStore(){
   this.iab.create('http://www.fhconline.in/');
  }

  logout(){
    this.afAuth.auth.signOut();
    this.menuCtrl.close();
    this.events.unsubscribe;
    this.nav.setRoot('LoginWithEmailPage');
  }
}

