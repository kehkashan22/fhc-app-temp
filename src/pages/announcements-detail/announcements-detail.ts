import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AnnouncementsDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-announcements-detail',
  templateUrl: 'announcements-detail.html',
})
export class AnnouncementsDetailPage {

  announcementDetail;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.announcementDetail = this.navParams.get('announcements');
    console.log(this.announcementDetail);  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnnouncementsDetailPage');
  }
  download(){
    console.log('Downloading started');
    
  }
}
