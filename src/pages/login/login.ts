/* 
  Name - Login Component
  Functionality - For authentication of users using firebase.
  Author - Shantanu Kamdi
  Date - 06/06/2017
*/

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CheckNetwork } from '../../providers/check-network';
/* Custom Toast Service */
import { CustomToast } from '../../providers/custom-toast';
/* Network */
import { Network } from '@ionic-native/network';
/* Logger Service*/
import { Logger } from '../../providers/logger';

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
              private network: Network,
              private _logger: Logger
  ) {
  }
  /* Check for Network - Remaining*/
  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  /* Navigate to Signup */
  navigateToSignup(){
    this._logger.log('navigateToSignup()');
    this.navCtrl.push('SignUp');
  }

}
