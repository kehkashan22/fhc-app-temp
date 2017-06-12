import { Component } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer';
import { CallNumber } from '@ionic-native/call-number';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  constructor(private emailComposer: EmailComposer,
              private callNumber: CallNumber) {
  }


      mailTo(mail: string){
      //   this.emailComposer.isAvailable().then((available: boolean) =>{
      //          if(available) {

      //          }
      // });

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
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
   }

}
