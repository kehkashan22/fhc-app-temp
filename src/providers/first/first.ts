import { Injectable } from '@angular/core';
import { ToastController } from "ionic-angular";
import { Storage } from "@ionic/storage";

@Injectable()
export class FirstProvider {

  count = 0;

   constructor(private storage: Storage,
    private toastCtrl: ToastController) {
  }

  addLaunchCount(count) {
    count = count > 100 ? 1 : count;
    this.storage.set('/launch', count)
      .then()
      .catch(
      err => {
        console.log("Could not store!");
      }
    );
  }

  loadLaunchCount() {
    this.storage.get('/launch')
      .then(
      (count) => {
        this.count = count != null ? count : 0;
        console.log(this.count);
      }
      )
      .catch(
      err => {
        console.log(err);
      }
      );
  }

  getLaunchCount() { //full array
    return this.count;
  }

}
