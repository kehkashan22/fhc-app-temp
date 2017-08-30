import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-about-details',
  templateUrl: 'about-details.html',
})
export class AboutDetailsPage {

  body: string = '';
  title: string = '';
  src = '';

  constructor(private navParams: NavParams, private view: ViewController) {
  }


  ionViewDidLoad() {
  }

  onClose(){
    this.view.dismiss();
  }

}
