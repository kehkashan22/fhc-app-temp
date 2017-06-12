import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

declare var FCMPlugin;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  fireStore = firebase.database().ref('/pushTokens');

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _auth: AuthProvider,
              private afd: AngularFireDatabase            
  ) {
    this.tokenSetup().then((token) => {
      this.storeToken(token);
    })
  }
  ionViewDidLoad(){
    FCMPlugin.onNotification((data) => {
      if(data.tapped){
        alert( JSON.stringify(data) );
      }else{
        alert( JSON.stringify(data) );
      }
    });

    FCMPlugin.onTokenRefresh((token) => {
      alert(token);
    });
  }

  storeToken(token){
    this.afd.list(this.fireStore).push({
      uid: firebase.auth().currentUser.uid,
      devToken: token
    }).then(() => {
      alert('Token Stored');
    }).catch(() => {
      alert('Token not stored');
    });
  }
  tokenSetup(){
    var promise = new Promise((resolve, reject) => {
      FCMPlugin.getToken((token) => {
        resolve(token);
      }, (err) => {
        reject(err);
      });
      
    });
    return promise;
  }
  logout(){
    this._auth.logout();
    this.navCtrl.setRoot('MainLoginPage');
  }
}
