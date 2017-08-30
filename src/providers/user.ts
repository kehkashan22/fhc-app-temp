import { GlobalsProvider } from './globals/globals';
import { AuthProvider } from './auth';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import * as firebase from 'firebase/app';

@Injectable()
export class UserProvider {

  data: any;
  constructor(public http: Http,
    private authProvider: AuthProvider, private g: GlobalsProvider) {
    this.data = null;
  }

  getUser() {

    const userId = this.authProvider.getActiveUser().uid;
    return new Promise((resolve, reject) => {
      firebase.database()
        .ref('/users/'+userId).child('/user').once('value', snapshot => {
          resolve(snapshot.val());
        });
    });
  }

  updateUserProfile(user): Promise<any>{

    let userId = this.authProvider.getActiveUser().uid;
    return new Promise((resolve, reject) => {
      firebase.database()
        .ref("users/"+userId).update(
          { user: user });
        });

  }

}
