import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { ContactPage } from './../pages/contact/contact';
import { LibraryPage } from './../pages/library/library';
import { AboutPage } from './../pages/about/about';
import { StarredPage } from './../pages/starred/starred';
import { MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { HomePage } from '../pages/home/home';
import { SettingsPage } from "../pages/settings/settings";
import { ProfilePage } from "../pages/profile/profile";

declare var FCMPlugin;


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

	 rootPage:any = 'IntroSlider';
	 profilePage = ProfilePage;
	 settingsPage = SettingsPage;
	 starredPage = StarredPage;
	 aboutPage = AboutPage;
	 libraryPage= LibraryPage;
	 contactPage = ContactPage;
	  
	@ViewChild('nav') nav: NavController;
  constructor(
              platform: Platform, 
              statusBar: StatusBar,   
              splashScreen: SplashScreen,
              private afAuth: AngularFireAuth,
			        private menuCtrl : MenuController,
              private iab: InAppBrowser

    ) {
    platform.ready().then(() => {

      //Angular Authentication
      const authObserver = afAuth.authState.subscribe( user => {
        if(user) {
          this.rootPage = 'HomePage';
          authObserver.unsubscribe();
        }else{
          this.rootPage = 'LoginWithEmailPage';
          authObserver.unsubscribe();
        }
      });

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.backgroundColorByHexString('#00BFE5');
      splashScreen.hide();
        
    });
  }
  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  goToStore(){
   this.iab.create('http://www.fhconline.in/');
  }
}

