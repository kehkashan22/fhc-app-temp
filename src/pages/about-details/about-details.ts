import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AboutDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
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
    this.title = this.navParams.get('title');
    this.body = this.navParams.get('body');
    this.src= this.navParams.get('src')
    console.log(this.title);
  }

  onClose(){
    this.view.dismiss();
  }

}
