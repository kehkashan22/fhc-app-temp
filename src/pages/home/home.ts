import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _auth: AuthProvider            
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  logout(){
    this._auth.logout();
    this.navCtrl.setRoot('MainLoginPage');
  }
}
