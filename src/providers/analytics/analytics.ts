import { Platform } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import * as firebase from 'firebase';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class AnalyticsProvider {

  constructor(private fa: Firebase,
    private ga: GoogleAnalytics,
    private platform: Platform) {
    console.log('Hello AnalyticsProvider Provider');
  }

  analyse(name) {
    const uid = firebase.auth().currentUser.uid;
    this.fa.logEvent('page_view', { page: name })
      .then((res: any) => console.log(res))
      .catch((error: any) => console.error(error));
    this.fa.setUserId(uid).then((res: any) => console.log(res))
      .catch((error: any) => console.error(error));
    this.fa.setScreenName(name).then((res: any) => console.log(res))
      .catch((error: any) => console.error(error));
    this.fa.setUserProperty('user_id', uid).then((res: any) => console.log(res))
      .catch((error: any) => console.error(error));

      this.trackView(name);

  }

  // userAnalysis(name) {
  //   this.ga.trackView(name);
  //   this.ga.setUserId(firebase.auth().currentUser.uid);
  // }

  trackView(name: string) {
    console.log('in ga view');
    const uid = firebase.auth().currentUser.uid;
    this.platform.ready().then(() => {
      console.log('in ga view: platform ready');
      this.ga.startTrackerWithId('UA-105141803-1').then(() => {
        console.log('Tracker started');
        this.ga.setUserId(uid).then(() => {
          console.log('Successful call to setUserId with userId : ' + uid);
        }).catch((error) => {
          console.log('Error calling setUserId -> ' + error);
        });
        this.ga.addCustomDimension(1, 'DIM-VALUE').then(() => {
          console.log('Successful call to addCustomDimension key : 1, value : DIM-VALUE');
        }).catch((error) => {
          console.log('Error calling addCustomDimension -> ' + error);
        });
        this.ga.trackView(name).then(() => {
          console.log('Successful call to trackView with name : ' + name);
        }).catch((error) => {
          console.log('Error calling trackView -> ' + error);
        });
      }).catch((error) => {
        console.log('Error calling startTrackerWithId -> ' + error);
      });
    });
  }

  trackEvent(category: string, action: string, label?: string) {
    this.platform.ready().then(() => {
      this.ga.startTrackerWithId('UA-105141803-1').then(() => {
        this.ga.setUserId('user.name').then(() => {
          console.log('Successful call to setUserId with userId : user.name');
        }).catch((error) => {
          console.log('Error calling setUserId -> ' + error);
        });
        this.ga.addCustomDimension(1, 'DIM-VALUE').then(() => {
          console.log('Successful call to addCustomDimension key : 1, value : DIM-VALUE');
        }).catch((error) => {
          console.log('Error calling addCustomDimension -> ' + error);
        });
        this.ga.trackEvent(category, action, label).then(() => {
          console.log('Successful call to trackEvent with category : ' + category + ', action : ' + action + ', label : ' + label);
        }).catch((error) => {
          console.log('Error calling trackEvent -> ' + error);
        });
      }).catch((error) => {
        console.log('Error calling startTrackerWithId -> ' + error);
      });
    });
  }

}
