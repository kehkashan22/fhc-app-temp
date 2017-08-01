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
        this.src = 'https://s3-ap-southeast-1.amazonaws.com/fhc.app/aboutpage.png';
        this.body ="Education is going through paradigm shift from the echelons of age old classrooms to reaching out to students at their doorsteps through different modes of communication. FHC is one of the pioneer in India to have realized the changing times and moulded itself to bring the best Quality lectures delivered by the best faculties in India to the doorsteps of students pursuing CA / CS and CMA course. All aspects required for clearing the exam with flying colours and developing skills for future career are taken care of at FHC, like";
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
