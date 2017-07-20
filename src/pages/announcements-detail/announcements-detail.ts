import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform, AlertController } from 'ionic-angular';

import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { LocalNotifications } from '@ionic-native/local-notifications';

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-announcements-detail',
  templateUrl: 'announcements-detail.html',
})
export class AnnouncementsDetailPage {

  announcementDetail;

  storageDirectory: string = '';

  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private transfer: Transfer, 
              private file: File,
              private toast: ToastController,
              private platform: Platform,
              private alertCtrl: AlertController,
              private localNotifications: LocalNotifications
              
      ) {
    // getting the passed parameters
    this.announcementDetail = this.navParams.get('announcements');
    console.log(this.announcementDetail);  
    
    // defining storage directory
    this.platform.ready().then(() => {
      
      if(!this.platform.is('cordova')) {
        return false;
      }
      if (this.platform.is('ios')) {
        this.storageDirectory = cordova.file.documentsDirectory;
      }
      else if(this.platform.is('android')) {
        this.storageDirectory = cordova.file.externalDataDirectory;
      }
      else {
        return false;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnnouncementsDetailPage');
  }
  download() {
    const fileTransfer: TransferObject = this.transfer.create();
    let url = this.announcementDetail.downloadLink;
    let fileTokens:Array<any> = url.split('/');
    const fileName = fileTokens[fileTokens.length - 1];
    console.log(fileName);
    
    fileTransfer.download(url, this.storageDirectory  + fileName).then((entry) => {
        let notification;
        if (entry) {
          notification = {
            title: 'Download Complete!',
            text: 'Location: Android/data/io.ionic.starter/files '
          }
          this.localNotifications.schedule(notification);
          
          /*let alert = this.alertCtrl.create({
              title: 'Downloaded Successfully',
              message: 'successfully downloaded at '+entry.toURL(),
              buttons: [{
                  text: 'Ok',
              }]
          });
          alert.present();*/
        }
        else {
            let alert = this.alertCtrl.create({
                title: 'Error',
                message: ''+entry.Error,
                buttons: [{
                    text: 'Ok',
                }]
            });
            alert.present();
        }
    });
  }
}
