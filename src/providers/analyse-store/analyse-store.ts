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
    max: number,
    exp: string
  };

  constructor(private storage: Storage,
    private _auth: AuthProvider,
    private toastCtrl: ToastController) {
  }

  addAsSolved(analysis: {solved: boolean, marks1: number, marks2: number,
    max: number, exp: string}) {
    const userId = this._auth.getActiveUser().uid;
    this.storage.set(userId + '/solved', analysis)
      .then()
      .catch(
      err => {
      }
    );
  }

  removeFromSolved(analysis: {solved: boolean, marks1: number, marks2: number, max: number, exp: string}) {
      const userId = this._auth.getActiveUser().uid;
    this.storage.set(userId + '/solved', analysis)
      .then()
      .catch(
      err => {
      });
  }

  loadSolved() {
    const userId = this._auth.getActiveUser().uid;
    this.storage.get(userId+'/solved')
      .then(
      (analysis: {solved: boolean, marks1: number, marks2: number, max: number, exp: string}) => {
        this.analysis = analysis != null ? analysis : {solved: false, marks1: 0, marks2: 0, max: 0, exp: ''};

      }
      )
      .catch(
      err => {
        let toast = this.toastCtrl.create({
          message: 'Could not load solved analysis. Please try again!',
          duration: 3000,
          position: 'middle'
        });


        toast.present();
      }
      );
  }

  getSolved() { //full array
    return this.analysis;
  }


}
