/* 
  Name - Intro Slider Component 
  Functionality - Intro Sliding Component. To be shown only when the user opens the app for first time. 
                  Need to look into performance factor.
  Author - Shantanu Kamdi
  Date - 06/06/2017
*/


import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/* Logger Service*/
import { Logger } from '../../providers/logger';

@IonicPage()
@Component({
  selector: 'page-intro-slider',
  templateUrl: 'intro-slider.html',
})
export class IntroSlider {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public _logger: Logger
  ) {
  }

  ionViewDidLoad() {
    this._logger.log('ionDidViewLoad intro-slider');
  }

  /* To load login page on button click*/
  navigateToLogin(){
    this._logger.log('navLogin() clicked');
    this.navCtrl.setRoot('MainLoginPage');
    
  }
}
