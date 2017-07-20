import { Component, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-announcements',
  templateUrl: 'announcements.html',
})
export class AnnouncementsPage {
  
  private announcements: Array<any> = [];
  
  private difference: number;

  @Output() emittedValue: EventEmitter<any> = new EventEmitter<any>();

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private afd: AngularFireDatabase,
              private loadingCtrl: LoadingController,
              private events: Events
              
  ) {
    this.getAnnouncements();
  }
  ionViewDidLoad(){
    
  }

getAnnouncements(){
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
      this.difference = data.length - this.announcements.length;
      
      //publishing the data
      this.emittedValue.emit(this.difference);

      data = data.reverse();
      this.announcements = data;
      
      
      console.log('Difference in announcements',this.difference);
      
      loader.dismiss();  
    });

}
    
  navigateToAnnouncement(announcement){
    this.navCtrl.push('AnnouncementsDetailPage', {
      announcements: announcement
    });
  }
  
  

}
