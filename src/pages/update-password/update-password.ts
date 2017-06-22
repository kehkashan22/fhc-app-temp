import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController, LoadingController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth';

import { Md5 } from 'ts-md5/dist/md5';

import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-update-password',
  templateUrl: 'update-password.html',
})
export class UpdatePasswordPage {

  private newPassword: string;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public alertCtrl: AlertController,
              private _auth: AuthProvider,
              public toast: ToastController,
              public loading: LoadingController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatePasswordPage');
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  updatePassword(){
    let loading = this.loading.create({
      spinner: 'bubbles',
      content: 'Updating password...'
    });

    loading.present();

    let newPass = ""+Md5.hashStr(this.newPassword);

    let user = firebase.auth().currentUser;

    user.updatePassword(newPass).then(() => {
      console.log('Successfully updated password');
      let toastMessage = this.toast.create({
        message: 'Password updated successfully',
        position: 'bottom',
        duration: 2000
      });
      loading.dismiss();
      toastMessage.present();

      this.viewCtrl.dismiss();
    }, (err) => {
      console.log('Error while updating new password');
      console.log(err);
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: err.message,
        buttons: 
        [
          {
            text: 'Ok',
            handler: () => {
              this._auth.logout();
              this.navCtrl.setRoot('LoginWithEmailPage');
            }
          }
        ]
      });
      alert.present();
      loading.dismiss();
    });
  }
}
