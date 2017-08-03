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
        this.title ="About CA Farooq Haque";
        this.src = 'https://s3-ap-southeast-1.amazonaws.com/fhc.app/aboutpage.png';
        this.body ="Farooq Haque Classes ( A unit of YO Edutech Solutions Pvt. Ltd.)Founded in 1998, by a  professional on a mission to revolutionize the process of teaching prevalent in the country,  Farooq Haque Classes ever since has endeavoured to blend  innovative learning techniques and advanced information and communication technologies to offer modern, scalable and affordable solutions to the education community. Main objective being on delivering the best quality education to students pursuing CA / CS and CMA at their doorsteps from the best faculties across India.";
    }else if(choice === 2){
      this.title ="Farooq Haque";
      this.src = 'https://s3-ap-southeast-1.amazonaws.com/fhc.app/farooqhaque.png';
      this.body ="Farooq Body";
    }else if(choice === 3){
      this.title ="Terms and Condition";
      this.src = 'https://s3-ap-southeast-1.amazonaws.com/fhc.app/terms1.png';
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
