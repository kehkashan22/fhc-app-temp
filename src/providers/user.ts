import { AuthProvider } from './auth';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {

  data: any;
  constructor(public http: Http,
              private authProvider : AuthProvider) {
    this.data = null;
  }

  getUser(){
    const userId = this.authProvider.getActiveUser().uid;
    console.log("UserID:");
    console.log(userId);
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.http.get('https://ionic-fhc-app.firebaseio.com/users/'+userId+'/newUserId.json')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });

  }

}
