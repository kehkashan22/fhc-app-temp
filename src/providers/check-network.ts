import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';

/*

*/
@Injectable()
export class CheckNetwork {

  constructor(private network: Network) {
    console.log('Hello CheckNetwork Provider');
  }

  checkStatus(){
    

   
  }
}
