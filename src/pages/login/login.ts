/* 
  Name - Login Component
  Functionality - For authentication of users using firebase.
  Author - Shantanu Kamdi
  Date - 06/06/2017
*/

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
export class Login {

  private loginForm: FormGroup;

  /* For Validation purposes */
  private submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              private _auth: AuthProvider,
              private _logger: Logger
  ) {
    this.loginForm = formBuilder.group({
      phoneNumber: [ '', Validators.compose([Validators.required, Validators.maxLength(10)])],
      password: [ '', Validators.required],
    });
  }
  /* Check for Network - Remaining*/
  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  /* Navigate to Signup */
  navigateToSignup(){
    this._logger.log('navigateToSignup()');
    this.navCtrl.setRoot('SignUp');
  }

  /* Login Method */
  login(){
    this._logger.log('login()');
    let loginUserData = {
      phoneNumber: this.loginForm.value.phoneNumber,
      password: this.loginForm.value.password
    };

    this._auth.authenticateAndLogin(loginUserData).then(authData => {
      console.log(authData);
      this.navCtrl.setRoot('HomePage');
    });
  }
}
