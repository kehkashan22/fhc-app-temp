import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  navLogin(){
    this._logger.log('navLogin() clicked');
    this.navCtrl.push('Login');
  }
}
