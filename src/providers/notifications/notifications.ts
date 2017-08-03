import { Injectable } from '@angular/core';
import { ToastController } from "ionic-angular";
import { Storage } from "@ionic/storage";

@Injectable()
export class NotificationsProvider {

  show: boolean;

  constructor(private storage: Storage,
    private toastCtrl: ToastController) {

  }

  setNote(show) {
    this.storage.set('/note', show)
      .then()
      .catch(
      err => {
        console.log("Could not store!");
      }
    );
  }

  getNote() {
    this.storage.get('/note')
      .then(
      (show) => {
        this.show = show != null ? show : false;
        return this.show;
      }
      )
      .catch(
      err => {
        console.log(err);
        return false;
      }
      );
  }

}
