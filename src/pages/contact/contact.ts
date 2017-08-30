import { CustomToast } from './../../providers/custom-toast';
import { Component } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer';
import { CallNumber } from '@ionic-native/call-number';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  constructor(private emailComposer: EmailComposer,
              private callNumber: CallNumber,
            private _toast: CustomToast) {
  }


      mailTo(mail: string){
      let email = {
                      to: mail,
                      subject: 'Support Required!',
                      isHtml: true
                  };

                  // Send a text message using default options
                  this.emailComposer.open(email);
   }

   callNow(number: string){
      this.callNumber.callNumber(number, true)
      .then()
      .catch(() => this._toast.show('Could not launch dialler'));
   }

}
