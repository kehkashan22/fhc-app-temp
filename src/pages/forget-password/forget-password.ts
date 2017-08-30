/*
  Name - Forget Password Component
  Functionality - For sending reset password link to users incase they forget their password.
  Author - Shantanu Kamdi
  Date - 08/06/2017
*/

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

/* Forms module */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/* Logger Service */
import { Logger } from '../../providers/logger';
/* Auth Service */
import { AuthProvider } from '../../providers/auth';

@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {

  /* Form */
  private forgotPasswordForm: FormGroup;

  /* For Validation purposes */
  private submitAttempt: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              private _auth: AuthProvider,
              private _logger: Logger,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController
  ) {
    /* Creating form using formBuilder */
    this.forgotPasswordForm = formBuilder.group({
      emailId: [ '', Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
  }

  /* Reset Password Function */
  resetPassword(){
    this._logger.log("resetPassword()");

    /* Loader */
    let loader = this.loadingCtrl.create({
      content: 'Checking Email and Sending Mail'
    });

    loader.present();

    /* Creating user object to pass it to forgetPassword method in Auth Service */
    let userEmailId = {
      emailId: this.forgotPasswordForm.value.emailId
    }

    /* Calling Auth Service for resetting password */
    this._auth.forgotPassword(userEmailId).then(()=>{
      this._logger.log("Successfully sent the reset password link");
      /* Creating Alert */
      let alert = this.alertCtrl.create({
        title: 'Email containing reset password link sent successfully',
        buttons: ['Ok']
      });

      alert.present();
      loader.dismiss();
      this.navCtrl.pop();
    }, (error) => {
      this._logger.log("Failed to send reset password link " + error);
      /* Creating Alert */
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: error.message,
        buttons: ['Ok']
      });
      alert.present();
      loader.dismiss();
    });
  }

  /* Navigate to Login */
  navigateToLogin(){
    this.navCtrl.setRoot('LoginWithEmailPage');
  }
}
