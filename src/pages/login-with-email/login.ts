import { NetworkProvider } from './../../providers/network/network';
/*
  Name - Login Component
  Functionality - For authentication of users using firebase.
  Author - Shantanu Kamdi
  Date - 06/06/2017
*/
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, MenuController } from 'ionic-angular';
/* Forms module */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/* Logger Service */
import { Logger } from '../../providers/logger';
/* Auth Service */
import { AuthProvider } from '../../providers/auth';



import { HomePage } from "../home/home";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginWithEmailPage {

  private loginForm: FormGroup;

  /* For Validation purposes */
  private submitAttempt: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private _auth: AuthProvider,
    private _logger: Logger,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private _network: NetworkProvider,
    private _menu: MenuController
  ) {

    this._menu.enable(false);
    //this._menu.swipeEnable(false, 'menu-toolbar');
    /* Building form  */
    this.loginForm = formBuilder.group({
      emailId: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required],
    });


  }
  /* Check for Network - Remaining*/
  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');

  }

  /* Navigate to Signup */
  navigateToSignup() {
    this._logger.log('navigateToSignup()');
    this.navCtrl.setRoot('SignUp');
  }

  /* Login Method */
  login() {
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

    if (this._network.noConnection()) {
      loader.dismiss();
      this._network.showNetworkAlert();
    } else {

      /* Calling Auth service method to login the user */

      this._auth.authenticateAndLogin(loginUserData).then(authData => {
        loader.dismiss();
        if (authData.emailVerified) {
          this._logger.log("Successfully logged in ");

          /* Navigate to Home Component */
          this.navCtrl.setRoot('HomePage');
        } else {

          const alert = this.alertCtrl.create({
            title: 'EMAIL NOT VERIFIED',
            message: "Please verify your email address",
            buttons: ['Ok']

          });

          alert.present();
        }
      }, (error) => {
        console.log('Error in logging in ' + error);

        loader.dismiss();
        const alert = this.alertCtrl.create({
          title: 'ERROR',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
    }
  }

  /* Navigate to Forget Password Component */
  forgotPassword() {
    this.navCtrl.push('ForgetPasswordPage');
  }

  //   googleLogin(): void {
  //   this._auth.googleLogin();
  // }

  // facebookLogin(): void {
  //   this._auth.facebookLogin();
  // }


}
