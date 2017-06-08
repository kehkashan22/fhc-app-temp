import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Logger } from '../../providers/logger';
import { AuthProvider } from '../../providers/auth';


@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUp {


  private form: FormGroup;
  private submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              private _logger: Logger,
              private _auth: AuthProvider
  ) {
    this.form = formBuilder.group({
        fullName: [ '', Validators.compose([Validators.required])],
        emailId: [''],
        phoneNumber: [ '', Validators.compose([Validators.required, Validators.maxLength(10)])],
        password: [ '', Validators.required],
        address: ['', Validators.required],
        attemptNo: ['', Validators.required],
        pincode: [ '', Validators.compose([Validators.required, Validators.maxLength(6)])],
        attemptDate: ['', Validators.required],
        dob: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUp');
  }

  signupUser(){
    this._logger.log('signupUser() method');
    let userData = {
      fullName: this.form.value.fullName,
      emailId: this.form.value.emailId,
      phoneNumber: this.form.value.phoneNumber,
      password: this.form.value.password,
      address: this.form.value.address,
      attemptNo: this.form.value.attemptNo,
      pincode: this.form.value.pincode,
      attemptDate: this.form.value.attemptDate,
      dob: this.form.value.dob
    }

    this._auth.registerUser(userData);



  }

  navigateToLogin(){
    this._logger.log('navigateToLogin() method');
    this.navCtrl.push('Login');
  }
}










