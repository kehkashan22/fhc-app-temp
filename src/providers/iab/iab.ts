import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Injectable } from '@angular/core';

@Injectable()
export class IabProvider {

  constructor(public iab: InAppBrowser) {
    console.log('Hello IabProvider Provider');
  }

  redirectToStore(){
    this.iab.create('http://www.fhconline.in/', "_system", "location=yes");
  }

  redirect(url){
    this.iab.create(url, "_system", "location=yes");
  }

}
