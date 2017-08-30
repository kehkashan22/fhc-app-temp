import { AlertController } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Network } from "@ionic-native/network";

@Injectable()
export class NetworkProvider {

  constructor(public http: Http, private diagnostic: Diagnostic, private network: Network, private alert: AlertController) {

  }

   noConnection(): boolean {
    return (this.network.type === 'none');
  }


  private showSettings() {
    if (this.diagnostic.switchToWifiSettings) {
      this.diagnostic.switchToWifiSettings();
    } else {
      this.diagnostic.switchToSettings();
    }
  }

  showNetworkAlert() {
    let networkAlert = this.alert.create({
      title: 'No Internet Connection',
      message: 'Please check your internet connection. You won\'t really be able to see anything on this page otherwise.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Open Settings',
          handler: () => {
            networkAlert.dismiss().then(() => {
              this.showSettings();
            })
          }
        }
      ]
    });
    networkAlert.present();
  }

}
