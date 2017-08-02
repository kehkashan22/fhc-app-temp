import { NetworkProvider } from './../../providers/network/network';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Platform, AlertController } from 'ionic-angular';

import { Transfer, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { AngularFireDatabase } from 'angularfire2/database';
import { Diagnostic } from '@ionic-native/diagnostic';
import { SocialSharing } from "@ionic-native/social-sharing";

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-announcements',
  templateUrl: 'announcements.html',
})
export class AnnouncementsPage {

  announcements: Array<any>;

  loader: any;
  temp: any;

  storageDirectory: string = '';

  fileTransfer: TransferObject = this.transfer.create();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private afd: AngularFireDatabase,
    private loadingCtrl: LoadingController,
    private transfer: Transfer,
    private file: File,
    private toast: ToastController,
    public platform: Platform,
    public alertCtrl: AlertController,
    private diagnostic: Diagnostic,
    private _network: NetworkProvider,
    private socialSharing: SocialSharing
  ) {

    // defining storage directory
    this.platform.ready().then(() => {
      // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
      if (!this.platform.is('cordova')) {
        return false;
      }
      if (this.platform.is('ios')) {
        this.storageDirectory = this.file.documentsDirectory;
      }
      else if (this.platform.is('android')) {
        this.diagnostic.requestExternalStorageAuthorization().then(() => {
          this.storageDirectory = this.file.externalRootDirectory + 'FHC/';
        }).catch(error => {
          this.storageDirectory = this.file.externalApplicationStorageDirectory;
        });

      }
      else {
        // exit otherwise, but you could add further types here e.g. Windows
        return false;
      }

    });
  }
  ionViewDidLoad() {
    this.loader = this.loadingCtrl.create({
      content: 'Loading Notifications',
      spinner: 'bubbles'
    });

    this.loader.present();

    if (this._network.noConnection()) {
      this.loader.dismiss();
      this._network.showNetworkAlert();
    } else {
      this.afd.list('/posts', {
        query: {
          orderByChild: 'date'
        }
      }).subscribe(data => {
        data = data.reverse();
        this.announcements = data;
        this.temp=this.announcements;
        this.loader.dismiss();
      });
    }

  }

  navigateToAnnouncement(announcement) {
    this.navCtrl.push('AnnouncementsDetailPage', {
      announcements: announcement
    });
  }

  download(annoucement: any) {
    const fileTransfer: TransferObject = this.transfer.create();
    let url = annoucement.downloadLink;
    let fileTokens: Array<any> = url.split('/');
    const fileName = fileTokens[fileTokens.length - 1];

    console.log(fileName);

    let loader = this.loadingCtrl.create({
      content: 'Downloading your file, please wait...',
      spinner: 'bubbles'
    });

    loader.present();


    fileTransfer.download(url, this.storageDirectory + fileName).then((entry) => {
      loader.dismiss();
      if (entry) {
        console.log('download complete: ' + entry.toURL());
        let alert = this.alertCtrl.create({
          title: 'Download successful!',
          message: 'File downloaded  at ' + entry.toURL(),
          buttons: [{
            text: 'Ok',
          }]
        });
        alert.present();
      }
      else {
        let alert = this.alertCtrl.create({
          title: 'Sorry, could not download your file!',
          message: '' + entry.Error,
          buttons: [{
            text: 'Ok',
          }]
        });
        alert.present();
      }
    },
      (err) => {
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Sorry, could not download your file!',
          message: err.json(),
          buttons: [{
            text: 'Ok',
          }]
        });
        alert.present();
      });
  }

  ionViewWillLeave(){
    this.loader.dismiss();
  }

  shareSheetShare(announcement) {
    const playstore = "https://play.google.com/store/apps/topic?id=editors_choice";
    this.socialSharing.share(announcement.message+"\nVisit http://fhconline.in for our products, or download our app for videos, quizzes, news and pdf and much more at:\n ", announcement.title, announcement.img, playstore).then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }

  getItems(val: string){
    if(val==='all'){
      this.announcements = this.temp;
    }else{
        this.announcements = this.announcements.filter((announcement) => {
          return announcement.id === val;
        });
    }
    
  }
}



