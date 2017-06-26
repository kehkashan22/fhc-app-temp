import { AuthProvider } from './auth';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class UserProvider {

  data: any;
  constructor(public http: Http,
    private authProvider: AuthProvider) {
    this.data = null;
  }

  getUser(token : string) {
    const userId = this.authProvider.getActiveUser().uid;
    return this.http.get('https://fhc-ionic-app.firebaseio.com/users/' + userId + '/user.json?auth=' + token)
      .map((res) => res.json())
      .do((data) => {
        this.data = data;
      });
  }

}
