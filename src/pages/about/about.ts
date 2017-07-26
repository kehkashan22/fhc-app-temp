import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ModalOptions } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  title = '';
  body = '';
  src= '';

  constructor(private modal: ModalController) {
  }

 
  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

   openModal(choice: number) {
    if(choice === 1){
        this.title ="About Farooq Haque";
        this.src = 'assets/images/2.jpg';
        this.body ="About Body";
    }else if(choice === 2){
      this.title ="Farooq Haque";
      this.src = '';
      this.body ="Farooq Body";
    }else if(choice === 3){
      this.title ="Terms and Condition";
      this.src = '';
      this.body ="Terms Body";
    }
    const myModal = this.modal.create('AboutDetailsPage', {
      title: this.title,
      body: this.body,
      src: this.src
    }, { cssClass: 'contact-popover' });
    myModal.present();
  }


}
