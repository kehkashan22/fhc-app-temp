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
    let fileTokens:Array<any> = url.split('/');
    const fileName = fileTokens[fileTokens.length - 1];
    console.log(fileName);
    
    fileTransfer.download(url, this.storageDirectory  + fileName).then((entry) => {
        let t = this.toast.create({
          message: 'Downloading started...',
          duration: 2000
        }).present();

        if (entry) {
            console.log('download complete: ' + entry.toURL());
            this.toast.create({
              message: 'Downloading completed',
              duration: 2000
            }).present(); 
            
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
