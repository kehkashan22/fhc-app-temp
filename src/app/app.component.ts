import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'IntroSlider';

  constructor(platform: Platform, 
              statusBar: StatusBar,   
              splashScreen: SplashScreen,
              keyboard: Keyboard,
              private afAuth: AngularFireAuth

    ) {
    platform.ready().then(() => {

      //Angular Authentication
      const authObserver = afAuth.authState.subscribe( user => {
        if(user) {
          this.rootPage = 'HomePage';
          authObserver.unsubscribe();
        }else{
          this.rootPage = 'MainLoginPage';
          authObserver.unsubscribe();
        }
      });

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.backgroundColorByHexString('#1976D2');
      splashScreen.hide();
      keyboard.disableScroll(true);
    });
  }
}

