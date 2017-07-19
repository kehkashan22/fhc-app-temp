import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-announcements',
  templateUrl: 'announcements.html',
})
export class AnnouncementsPage {
  
  announcements: Array<any>;

  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private afd: AngularFireDatabase,
              private loadingCtrl: LoadingController
              
  ) {
    
  }
  ionViewDidLoad(){
    let loader = this.loadingCtrl.create({
      content: 'Loading...',
      spinner: 'bubbles'
    });

    loader.present();

    this.afd.list('/posts', {
      query: {
        orderByChild: 'date'
      }
    }).subscribe(data => {
      data = data.reverse();
      this.announcements = data;
      loader.dismiss();  
    });

  }
  navigateToAnnouncement(announcement){
    this.navCtrl.push('AnnouncementsDetailPage', {
      announcements: announcement
    });
  }
  
  

}
