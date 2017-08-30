import { Component } from '@angular/core';
import { IonicPage,  NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-instructions',
  templateUrl: 'instructions.html',
})
export class InstructionsPage {
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
