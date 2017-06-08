import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CheckNetwork } from '../../providers/check-network';
import { CustomToast } from '../../providers/custom-toast';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _toast: CustomToast,
              private _checkNetwork: CheckNetwork,
              private network: Network
  ) {
  }
  /* Check for Network - Remaining*/
  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }


  navigateToSignup(){
    this.navCtrl.push('SignUp');
  }

}
