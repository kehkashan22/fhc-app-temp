import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import * as firebase from 'firebase';

@Injectable()
export class AnalyticsProvider {

  constructor(private fa: Firebase) {
    console.log('Hello AnalyticsProvider Provider');
  }

 analyse(name){
   const uid = firebase.auth().currentUser.uid;
   this.fa.logEvent('page_view', {page: name})
  .then((res: any) => console.log(res))
  .catch((error: any) => console.error(error));
  this.fa.setUserId(uid).then((res: any) => console.log(res))
  .catch((error: any) => console.error(error));
   this.fa.setScreenName(name).then((res: any) => console.log(res))
  .catch((error: any) => console.error(error));
   this.fa.setUserProperty('user_id', uid).then((res: any) => console.log(res))
  .catch((error: any) => console.error(error));
 }

}
