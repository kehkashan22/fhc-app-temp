import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, LoadingController } from 'ionic-angular';
/* Forms module */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthProvider } from '../../providers/auth';

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
              private loadingCtrl: LoadingController
  ) {
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
    console.log('ionViewDidLoad EditProfilePage');

    
      /* Loader */
    let loader = this.loadingCtrl.create({
      spinner: "bubbles",
      content: 'Loading...'
    });
    loader.present();


    this.getUserProfile().then(data => {
      this.user = data;
      
      console.log("data", this.user.newUserId);
      let user = {
        fullName: this.user.newUserId.fullName,
        emailId: this.user.newUserId.emailId,
        phoneNumber: this.user.newUserId.phoneNumber,
        address: this.user.newUserId.address,
        attemptNo: this.user.newUserId.attemptNo,
        pincode: this.user.newUserId.pincode,
        attemptDate: this.user.newUserId.attemptDate,
        dob: this.user.newUserId.dob,
        gender: this.user.newUserId.gender,
        typeOfCourse: this.user.newUserId.typeOfCourse
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

  closeModal(){
    this.viewCtrl.dismiss();
  }

  update(){

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
}
