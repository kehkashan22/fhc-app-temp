import { QuizService } from './../services/quiz';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ContactPage } from './../pages/contact/contact';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { VideoPlayer } from '@ionic-native/video-player';
import {EmailComposer } from '@ionic-native/email-composer';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { QuizPage } from './../pages/quiz/quiz';
import { AuthService } from './../services/auth';
import { SignupPage } from './../pages/signup/signup';
import { SigninPage } from '../pages/signin/signin';
import { StarredPage } from './../pages/starred/starred';
import { VideosService } from './../services/videos';
import { VideosPage } from './../pages/videos/videos';
import { VideoPage } from './../pages/video/video';
import { SettingsPage } from './../pages/settings/settings';
import { ProfilePage } from './../pages/profile/profile';
import { AnalysisPage } from './../pages/analysis/analysis';
import { AboutPage } from './../pages/about/about';
import { LibraryPage } from './../pages/library/library';
import { BrowserModule } from '@angular/platform-browser';
import { CallNumber } from '@ionic-native/call-number';


import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';

import { YoutubePipe } from '../pipes/youtube';
import { VideosProvider } from '../providers/videos';

/* Shantanu */
import { Logger } from '../providers/logger';
import { CustomToast } from '../providers/custom-toast';
import { AuthProvider } from '../providers/auth';
import { Keyboard } from '@ionic-native/Keyboard';

/* For Firebase Related */
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

/* Firebase config object. Need to make it dynamic. Temp hack*/
const firebaseConfig = {
    apiKey: "AIzaSyBTWVR9YYEkE7xLDyCtThZJhW_CLiM4Ka0",
    authDomain: "fhc-app-47154.firebaseapp.com",
    databaseURL: "https://fhc-app-47154.firebaseio.com",
    projectId: "fhc-app-47154",
    storageBucket: "fhc-app-47154.appspot.com",
    messagingSenderId: "108315354380"
};

@NgModule({
  declarations: [
    MyApp,
    LibraryPage,
    AboutPage,
    AnalysisPage,
    ProfilePage,
    SettingsPage,
    VideoPage,
    VideosPage,
    StarredPage,
    YoutubePipe,
    SigninPage,
    SignupPage,
    QuizPage,
    ContactPage
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    HttpModule,
    BrowserAnimationsModule,
     IonicModule.forRoot(MyApp, {
      //for limiting scrolling of the page when keyboard is up
      scrollAssist: false
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LibraryPage,
    AboutPage,
    AnalysisPage,
    ProfilePage,
    SettingsPage,
    VideoPage,
    VideosPage,
    StarredPage,
    SigninPage,
    SignupPage,
    QuizPage,
    ContactPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    VideosService,
    AuthService,
    QuizService,
    VideoPlayer,
    VideosProvider,
    EmailComposer,
    InAppBrowser,
    CallNumber,
    Logger,
    CustomToast,
    AuthProvider,
    AngularFireDatabase,
    Keyboard
  ]
})
export class AppModule {}