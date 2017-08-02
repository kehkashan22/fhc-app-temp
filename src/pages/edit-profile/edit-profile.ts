import { UserProvider } from './../../providers/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, LoadingController, AlertController } from 'ionic-angular';
/* Forms module */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthProvider } from '../../providers/auth';
import { User } from "../../data/user.interface";


@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  private user: User;
  /* FormGroup which will be used in html */
  private form: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalCtrl: ModalController,
              private viewCtrl: ViewController,
              private _auth: AuthProvider,
              private formBuilder: FormBuilder,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private _user: UserProvider
  ) {
    this.form = formBuilder.group({
        fullName: [ '', Validators.required],
        emailId: ['', Validators.required],
        phoneNumber: [ '', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
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
    console.log('ionViewDidLoad EditProfilePage');


      /* Loader */
    let loader = this.loadingCtrl.create({
      spinner: "bubbles",
      content: 'Loading...'
    });
    loader.present();


    this._user.getUser().then((data: User) => {
      this.user = data;


      this.form.get('fullName').setValue(this.user.fullName);
      this.form.get('emailId').setValue(this.user.emailId);
      this.form.get('phoneNumber').setValue(this.user.phoneNumber);
      this.form.get('address').setValue(this.user.address);
      this.form.get('attemptNo').setValue(this.user.attemptNo);
      this.form.get('attemptDate').setValue(this.user.attemptDate);
      this.form.get('pincode').setValue(this.user.pincode);
      this.form.get('dob').setValue(this.user.dob);
      this.form.get('gender').setValue(this.user.gender);
      this.form.get('typeOfCourse').setValue(this.user.typeOfCourse);

      loader.dismiss();
    });
  }

  update(){
    /* Loader */
    let loader = this.loadingCtrl.create({
      spinner: "bubbles",
      content: 'Updating',
      duration: 3000
    });
    loader.present();

    let user = {
        fullName: this.form.value.fullName,
        emailId: this.form.value.emailId,
        phoneNumber: this.form.value.phoneNumber,
        address: this.form.value.address,
        attemptNo: this.form.value.attemptNo,
        pincode: this.form.value.pincode,
        attemptDate: this.form.value.attemptDate,
        dob: this.form.value.dob,
        gender: this.form.value.gender,
        typeOfCourse: this.form.value.typeOfCourse
      }

    console.log("Updated Info");
    console.log(user);

    this._user.updateUserProfile(user).then(() => {
      //loader.dismiss();
      this.viewCtrl.dismiss();
    }, (err) => {
      console.log(err);
    });

  }

  updatePassword(){
    let modal = this.modalCtrl.create('UpdatePasswordPage');
    modal.present();
  }


}








