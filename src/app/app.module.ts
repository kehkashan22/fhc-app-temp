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
import { HomePage } from '../pages/home/home';
import { YoutubePipe } from '../pipes/youtube';
import { VideosProvider } from '../providers/videos';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
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
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    BrowserAnimationsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
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
    CallNumber
  ]
})
export class AppModule {}
