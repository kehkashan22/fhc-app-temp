import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-main-login',
  templateUrl: 'main-login.html',
})
export class MainLoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainLoginPage');
  }

  loginWithEmail(){
    this.navCtrl.push('LoginWithEmailPage');
  }

  loginWithPhone(){
    this.navCtrl.push('LoginWithPhonenumberPage');
  }

  signUp(){
    this.navCtrl.push('SignUp');
  }
}
