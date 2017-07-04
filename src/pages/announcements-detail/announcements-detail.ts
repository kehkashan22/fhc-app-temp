import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform, AlertController } from 'ionic-angular';

import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-announcements-detail',
  templateUrl: 'announcements-detail.html',
})
export class AnnouncementsDetailPage {

  announcementDetail;

  storageDirectory: string = '';

  fileTransfer: TransferObject = this.transfer.create();

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private transfer: Transfer, 
              private file: File,
              private toast: ToastController,
              public platform: Platform,
              public alertCtrl: AlertController,) {
    // getting the passed parameters
    this.announcementDetail = this.navParams.get('announcements');
    console.log(this.announcementDetail);  
    
    // defining storage directory
    this.platform.ready().then(() => {
      // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
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
        // exit otherwise, but you could add further types here e.g. Windows
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
    fileTransfer.download(url, this.storageDirectory  + 'Node.pdf').then((entry) => {
        if (entry) {
            console.log('download complete: ' + entry.toURL());
            let alert = this.alertCtrl.create({
                title: 'Downloaded Successfully',
                message: 'successfully downloaded at '+entry.toURL(),
                buttons: [{
                    text: 'Ok',
                }]
            });
            alert.present();
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
