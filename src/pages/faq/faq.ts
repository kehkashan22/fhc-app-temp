import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage {

   constructor( private view: ViewController) {
  }

  ionViewDidLoad() {
  }

   onClose(){
    this.view.dismiss();
  }

}
