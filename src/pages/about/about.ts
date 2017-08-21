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

   openAbout() {
    const myModal = this.modal.create('AboutDetailsPage');
    myModal.present();
  }

  openPrivacy(){
    const myModal = this.modal.create('PrivacyPage');
    myModal.present();
  }

  openTerms(){
    const myModal = this.modal.create('TermsPage');
    myModal.present();
  }
  
  openFaq(){
    const myModal = this.modal.create('FaqPage');
    myModal.present();
  }

}
