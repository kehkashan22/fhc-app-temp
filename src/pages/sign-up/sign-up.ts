/* 
  Name - Signup Component
  Functionality - For registering of users using firebase.
  Author - Shantanu Kamdi
  Date - 07/06/2017
  Updated - 08/06/2017
*/
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
/* Forms module */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/* Logger Service */
import { Logger } from '../../providers/logger';
/* Auth Service */
import { AuthProvider } from '../../providers/auth';


@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUp {

  /* FormGroup which will be used in html */
  private form: FormGroup;
  /* For Validation purposes */
  private submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              private _logger: Logger,
              private _auth: AuthProvider,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController
  ) {
    /* Creating form using formBuilder module and applying validations. Need to validate fields and make hash password */
    this.form = formBuilder.group({
        fullName: [ '', Validators.required],
        emailId: ['', Validators.required],
        phoneNumber: [ '', Validators.compose([Validators.required, Validators.minLength(10)])],
        password: [ '', Validators.required],
        address: [''],
        attemptNo: ['', Validators.required],
        pincode: [ '', Validators.minLength(6)],
        attemptDate: ['', Validators.required],
        dob: [''],
        gender: [''],
        typeOfCourse: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUp');
  }

  /* Signup user method which is called in click */
  signupUser(){
    this._logger.log('signupUser() method');
    
    /* Creating user object using form values*/
    let userData = {
      fullName: this.form.value.fullName,
      emailId: this.form.value.emailId,
      phoneNumber: this.form.value.phoneNumber,
      password: this.form.value.password,
      address: this.form.value.address,
      attemptNo: this.form.value.attemptNo,
      pincode: this.form.value.pincode,
      attemptDate: this.form.value.attemptDate,
      dob: this.form.value.dob,
      favoriteVideos: [],
      gender: this.form.value.gender,
      typeOfCourse: this.form.value.typeOfCourse
    }

    /* Loader */
    let loader = this.loadingCtrl.create({
      content: 'Registering User'
    });

    loader.present();
    
    /* Auth service registerUser method */
    this._auth.registerUser(userData).then(() => {
      /* Resetting the form once everything is done */
      this.form.reset();
      /* Setting the stack root to login */
      this.navCtrl.setRoot('MainLoginPage');
      /* Dismissing the loader */
      loader.dismiss();
    }, (error) => {
      /* handle the errors in any */
      loader.dismiss();
       const alert = this.alertCtrl.create({
          title: 'Something went wrong!!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
    });
  }

  /* Navigate back to login */
  navigateToLogin(){
    this._logger.log('navigateToLogin() method');
    /* For avoiding the stacking of the same page again and again */
    this.navCtrl.setRoot('LoginWithEmailPage');
  }
}
