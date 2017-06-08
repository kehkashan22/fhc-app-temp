import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'IntroSlider';

  constructor(platform: Platform, 
              statusBar: StatusBar,   
              splashScreen: SplashScreen,
              keyboard: Keyboard

    ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.backgroundColorByHexString('#1976D2');
      splashScreen.hide();
      keyboard.disableScroll(true);
    });
  }
}

