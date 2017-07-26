import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
              private afd: AngularFireDatabase
              
  ) {
    
  }
  ionViewDidLoad(){
    this.getData().subscribe((data) => {
      this.announcements = data;
      console.log(this.announcements);
    });
  }
  navigateToAnnouncement(announcement){
    this.navCtrl.push('AnnouncementsDetailPage', {
      announcements: announcement
    });
  }
  getData(){
    return this.afd.list('/posts');
  }
  

}
