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
    this.title = this.navParams.get('title');
    this.body = this.navParams.get('body');
    this.src= this.navParams.get('src')
    console.log(this.title);
  }

  onClose(){
    this.view.dismiss();
  }
}
