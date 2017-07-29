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
    // return this.http.get(this.g.firebase_url+'users/' + userId + '/user.json?auth=' + token)
    //   .map((res) => res.json())
    //   .do((data) => {
    //     this.data = data;
    //   });
    return new Promise((resolve, reject) => {
      firebase.database()
        .ref('/users/'+userId).child('/user').once('value', snapshot => {
          console.log(snapshot.val());
          resolve(snapshot.val());
        });
    });
  }

}
