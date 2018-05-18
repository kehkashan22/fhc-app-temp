import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

//Native
import { EmailComposer } from '@ionic-native/email-composer';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppRate } from '@ionic-native/app-rate';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Diagnostic } from '@ionic-native/diagnostic';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player'
import { Network } from '@ionic-native/network';
import { Keyboard } from '@ionic-native/Keyboard';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Transfer  } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { FCM } from "@ionic-native/fcm";

//Modules
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';


// Providers
import { VideosProvider } from '../providers/videos';
import { UserProvider } from '../providers/user';
import { VideosService } from './../providers/fav-videos';
import { QuizService } from './../providers/quiz';
import { QuizStoreProvider } from '../providers/quiz-store';
import { Logger } from '../providers/logger';
import { AuthProvider } from '../providers/auth';
import { AnalyseStoreProvider } from '../providers/analyse-store/analyse-store';
import { FirstProvider } from '../providers/first/first';
import { NotificationsProvider } from '../providers/notifications/notifications';
import { RateServiceProvider } from '../providers/rate-service/rate-service';
import { IabProvider } from '../providers/iab/iab';
import { AnalyticsProvider } from '../providers/analytics/analytics';
import { NetworkProvider } from '../providers/network/network';

/* For Firebase Related */
import { AngularFireModule } from 'angularfire2';
import { GlobalsProvider } from '../providers/globals/globals';

//Round progress bar
import { RoundProgressService, RoundProgressEase, RoundProgressConfig } from "angular-svg-round-progressbar/dist";
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FIREBASE_CONFIG } from './firebase.credentials';

/* Firebase config object. Need to make it dynamic. Temp hack*/


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    HttpModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp, {
      //for limiting scrolling of the page when keyboard is up
      scrollAssist: false,
      swipeBackEnabled: false
    }),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule
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
    Logger,
    AuthProvider,
    Keyboard,
    UserProvider,
    GlobalsProvider,
    QuizStoreProvider,
    Transfer,
    File,
    YoutubeVideoPlayer,
    FCM,
    Diagnostic,
    Network,
    NetworkProvider,
    SocialSharing,
    AnalyseStoreProvider,
    FirstProvider,
    NotificationsProvider,
    AppRate,
    RateServiceProvider,
    IabProvider,
    AnalyticsProvider,
    RoundProgressService,
    RoundProgressEase,
    RoundProgressConfig
  ]
})
export class AppModule {}
