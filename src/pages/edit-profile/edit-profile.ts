import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, LoadingController, AlertController } from 'ionic-angular';
/* Forms module */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthProvider } from '../../providers/auth';

import { Md5 } from 'ts-md5/dist/md5';

import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  private user;
  private db;
  /* FormGroup which will be used in html */
  private form: FormGroup;
 
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private modalCtrl: ModalController,
              private viewCtrl: ViewController,
              private _auth: AuthProvider,
              private formBuilder: FormBuilder,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController
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
    
    this.db = firebase.database();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');

    
      /* Loader */
    let loader = this.loadingCtrl.create({
      spinner: "bubbles",
      content: 'Loading...'
    });
    loader.present();


    this.getUserProfile().then(data => {
      this.user = data;
      
      console.log("data", this.user.user);
      let user = {
        fullName: this.user.user.fullName,
        emailId: this.user.user.emailId,
        phoneNumber: this.user.user.phoneNumber,
        address: this.user.user.address,
        attemptNo: this.user.user.attemptNo,
        pincode: this.user.user.pincode,
        attemptDate: this.user.user.attemptDate,
        dob: this.user.user.dob,
        gender: this.user.user.gender,
        typeOfCourse: this.user.user.typeOfCourse
      }
      this.form.get('fullName').setValue(user.fullName);
      this.form.get('emailId').setValue(user.emailId);
      this.form.get('phoneNumber').setValue(user.phoneNumber);
      this.form.get('address').setValue(user.address);
      this.form.get('attemptNo').setValue(user.attemptNo);
      this.form.get('attemptDate').setValue(user.attemptDate);
      this.form.get('pincode').setValue(user.pincode);
      this.form.get('dob').setValue(user.dob);
      this.form.get('gender').setValue(user.gender);
      this.form.get('typeOfCourse').setValue(user.typeOfCourse);

      loader.dismiss();
    });
  }

  update(){
    /* Loader */
    let loader = this.loadingCtrl.create({
      spinner: "bubbles",
      content: 'Updating'
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

    this.updateUserProfile(user).then(() => {
      loader.dismiss();
      this.viewCtrl.dismiss();
    }, (err) => {
      console.log(err);
    });

  }

  updateUserProfile(user): Promise<any>{

    let currentUser = firebase.auth().currentUser;
    return this.db.ref("users/"+currentUser.uid).update( { user: user });
    
  }


  getUserProfile(): Promise<any>{
    return new Promise((resolve, reject) => {
      firebase.database().ref('/users')
      .child(firebase.auth().currentUser.uid)
      .on('value', data => {
        console.log(data);
        resolve(data.val());
      })
    });
  }

  updatePassword(){
    let modal = this.modalCtrl.create('UpdatePasswordPage');
    modal.present();
  }


}








