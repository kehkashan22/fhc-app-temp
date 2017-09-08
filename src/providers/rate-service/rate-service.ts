import { Injectable } from '@angular/core';
import { AppRate } from 'ionic-native';
import { Platform } from 'ionic-angular';

@Injectable()
export class RateServiceProvider {

  appRate: any = AppRate;

  constructor(public platform: Platform) {
    this.platform.ready().then(
      () => {
        this.appRate.preferences.storeAppURL = {
          android: 'market://details?id=in.fhconline.fhc'
        };
        this.appRate.preferences.usesUntilPrompt = 11;
        this.appRate.preferences.customLocale = {
          title: 'Like what you see?',
          message: 'Please rate us for a continued impeccable service!',
          cancelButtonLabel: 'Pass',
          rateButtonLabel: 'Rate it!',
          laterButtonLabel: 'Ask Later'
        }
      }
  )
  }

}
