import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
/* Forms module */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/* Logger Service */
import { Logger } from '../../providers/logger';
/* Auth Service */
import { AuthProvider } from '../../providers/auth';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginWithEmailPage {

 loginForm: FormGroup;

  /* For Validation purposes */
  private submitAttempt: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              private _auth: AuthProvider,
              private _logger: Logger,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private _menu: MenuController
  ) {
    /* Building form  */
    this.loginForm = formBuilder.group({
      emailId: [ '', Validators.compose([Validators.required])],
      password: [ '', Validators.required],
    });
  }
  /* Check for Network - Remaining*/
  ionViewDidLoad() {
    this._menu.enable(false);

  }

  /* Navigate to Signup */
  navigateToSignup(){
    this._logger.log('navigateToSignup()');
    this.navCtrl.setRoot('SignUp');
  }

  /* Login Method */
  login(){
    this._logger.log('login()');
    /* Building user */
    let loginUserData = {
      emailId: this.loginForm.value.emailId,
      password: this.loginForm.value.password
    };

     /* Loader */
    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Signing you in...'
    });

    loader.present();

    /* Calling Auth service method to login the user */
    this._auth.authenticateAndLogin(loginUserData).then(authData => {
      loader.dismiss();
      if(authData.emailVerified){
        this._logger.log("Successfully logged in ");

        /* Navigate to Home Component */
        this._menu.enable(true);
        this.navCtrl.setRoot('HomePage');
      }else{

          const alert = this.alertCtrl.create({
          title: 'EMAIL NOT VERIFIED',
          message: "Please verify your email address",
          buttons: ['Ok']

        });

         alert.present();

      }
    }, (error) => {

        loader.dismiss();
        const alert = this.alertCtrl.create({
          title: 'ERROR',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }

  /* Navigate to Forget Password Component */
  forgotPassword(){
    this.navCtrl.push('ForgetPasswordPage');
  }


}
