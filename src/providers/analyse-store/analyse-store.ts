import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AuthProvider } from "../auth";
import { ToastController } from "ionic-angular";

import { Storage } from "@ionic/storage";

@Injectable()
export class AnalyseStoreProvider {

  analysis: {
    solved: boolean,
    marks1: number,
    marks2: number,
    max: number
  };

  constructor(private storage: Storage,
    private _auth: AuthProvider,
    private toastCtrl: ToastController) {
  }

  addAsSolved(analysis: {solved: boolean, marks1: number, marks2: number,
    max: number}) {
    const userId = this._auth.getActiveUser().uid;
    this.storage.set(userId + '/solved', analysis)
      .then()
      .catch(
      err => {
        console.log("Could not store");
      }
      );
  }

  removeFromSolved(analysis: {solved: boolean, marks1: number, marks2: number, max: number}) {
      const userId = this._auth.getActiveUser().uid;
    this.storage.set(userId + '/solved', analysis)
      .then()
      .catch(
      err => {
        console.log("Could not remove");
      });
  }

  loadSolved() {
    const userId = this._auth.getActiveUser().uid;
    this.storage.get(userId+'/solved')
      .then(
      (analysis: {solved: boolean, marks1: number, marks2: number, max: number}) => {
        this.analysis = analysis != null ? analysis : {solved: false, marks1: 0, marks2: 0, max: 0};
        console.log(this.analysis);
      }
      )
      .catch(
      err => {
        let toast = this.toastCtrl.create({
          message: 'Could not load solved analysis. Please try again!',
          duration: 3000,
          position: 'middle'
        });

        toast.onDidDismiss(() => {
          console.log('Dismissed Toast');
        });

        toast.present();
      }
      );
  }

  getSolved() { //full array
    return this.analysis;
  }


}
