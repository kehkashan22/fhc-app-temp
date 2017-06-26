import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

import firebase from 'firebase';

declare var FCMPlugin;


@IonicPage()
@Component({
  selector: 'page-announcements',
  templateUrl: 'announcements.html',
})
export class AnnouncementsPage {

  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              
  ) {
    
  }
  ionViewDidLoad(){
    
  }

  

}
