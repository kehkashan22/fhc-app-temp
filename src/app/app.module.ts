import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//Videogular
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';

//Native
import { EmailComposer } from '@ionic-native/email-composer';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { BrowserModule } from '@angular/platform-browser';
import { CallNumber } from '@ionic-native/call-number';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';


// Providers
import { VideosProvider } from '../providers/videos';
import { UserProvider } from '../providers/user';
import { LoaderProvider } from '../providers/loader';
import { VideosService } from './../providers/fav-videos';
import { QuizService } from './../providers/quiz';

/* Shantanu's modules */
import { Logger } from '../providers/logger';
import { AuthProvider } from '../providers/auth';
import { Keyboard } from '@ionic-native/Keyboard';

/* For Firebase Related */
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';



/* Firebase config object. Need to make it dynamic. Temp hack*/
const firebaseConfig = {
    apiKey: "AIzaSyAutL08qJ8hTPM2860x-LHEAnDmgDEObRA",
    authDomain: "fhc-ionic-app.firebaseapp.com",
    databaseURL: "https://fhc-ionic-app.firebaseio.com",
    projectId: "fhc-ionic-app",
    storageBucket: "fhc-ionic-app.appspot.com",
    messagingSenderId: "928506390872"
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    HttpModule,
    BrowserAnimationsModule,
    // //Videogular
    // VgCoreModule,
    // VgControlsModule,
    // VgOverlayPlayModule,
    // VgBufferingModule,

    IonicModule.forRoot(MyApp, {
      //for limiting scrolling of the page when keyboard is up
      scrollAssist: false
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    VideosService,
    QuizService,
    VideosProvider,
    EmailComposer,
    InAppBrowser,
    CallNumber,
    Logger,
    AuthProvider,
    AngularFireDatabase,
    Keyboard,
    UserProvider,
    LoaderProvider

  ]
})
export class AppModule {}
