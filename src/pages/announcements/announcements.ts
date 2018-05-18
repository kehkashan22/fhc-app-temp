import { AuthProvider } from "./../../providers/auth";
import { NetworkProvider } from "./../../providers/network/network";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  ToastController,
  Platform,
  AlertController
} from "ionic-angular";

import { Transfer, TransferObject } from "@ionic-native/transfer";
import { File } from "@ionic-native/file";
import { AngularFireDatabase } from "angularfire2/database";
import { Diagnostic } from "@ionic-native/diagnostic";
import { SocialSharing } from "@ionic-native/social-sharing";
import { InAppBrowser } from "@ionic-native/in-app-browser";

declare var cordova: any;

@IonicPage()
@Component({
  selector: "page-announcements",
  templateUrl: "announcements.html"
})
export class AnnouncementsPage {
  announcements: Array<any> = [];

  loader: any;
  temp: any;

  storageDirectory: string = "";
  currentSelected = "all";

  fileTransfer: TransferObject = this.transfer.create();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afd: AngularFireDatabase,
    private transfer: Transfer,
    private file: File,
    private iab: InAppBrowser,
    private toast: ToastController,
    public platform: Platform,
    public alertCtrl: AlertController,
    private diagnostic: Diagnostic,
    private _network: NetworkProvider,
    private socialSharing: SocialSharing,
    private _loader: LoadingController,
    private _auth: AuthProvider
  ) {
    // defining storage directory
    this.platform.ready().then(() => {
      // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
      if (!this.platform.is("cordova")) {
        return false;
      }
      if (this.platform.is("ios")) {
        this.storageDirectory = this.file.documentsDirectory;
      } else if (this.platform.is("android")) {
        this.diagnostic
          .requestExternalStorageAuthorization()
          .then(() => {
            this.storageDirectory =
              this.file.externalRootDirectory + "Downloads/";
          })
          .catch(error => {
            this.storageDirectory = this.file.externalApplicationStorageDirectory;
          });
      } else {
        // exit otherwise, but you could add further types here e.g. Windows
        return false;
      }
    });
  }

  ionViewDidLoad() {
    this.loader = this._loader.create({
      content: "Loading Notifications",
      spinner: "bubbles"
    });

    this.loader.present();

    if (this._network.noConnection()) {
      this.loader.dismiss();
      this._network.showNetworkAlert();
    } else {
      this.afd.list('/posts',
      ref =>
        ref.orderByChild('date')
      ).valueChanges().subscribe(data => {
          data = data.reverse();
          this.announcements = data;
          this.temp = this.announcements;
          this.loader.dismiss();
        });
    }
  }

  navigateToAnnouncement(announcement) {
    this.navCtrl.push("AnnouncementsDetailPage", {
      announcements: announcement
    });
  }

  download(annoucement: any) {
    const fileTransfer: TransferObject = this.transfer.create();
    let url = annoucement.downloadLink;
    let fileTokens: Array<any> = url.split("/");
    const fileName = fileTokens[fileTokens.length - 1];
    let loader = this._loader.create({
      content: "Downloading your file, please wait...",
      spinner: "bubbles"
    });

    loader.present();

    fileTransfer.download(url, this.storageDirectory + fileName).then(
      entry => {
        loader.dismiss();
        if (entry) {
          let alert = this.alertCtrl.create({
            title: "Download successful!",
            message: "File downloaded  at " + entry.toURL(),
            buttons: [
              {
                text: "Ok"
              }
            ]
          });
          alert.present();
        } else {
          this.iab.create(url, "_system", "location=yes");
        }
      },
      err => {
        loader.dismiss();
        this.iab.create(url, "_system", "location=yes");
      }
    );
  }

  ionViewWillLeave() {
    this.loader.dismiss();
  }

  shareSheetShare(announcement) {
    const playstore = "https://goo.gl/Xd7R9K";
    let loader = this._loader.create({
      spinner: "bubbles",
      content: "breathe in...breathe out..."
    });
    loader.present();
    /**
     * share(message, subject, file, url)
      Shares using the share sheet

      Param	Type	Details
      message	string
      The message you would like to share.
      subject	string
      The subject
      file	string|Array.<string>
      URL(s) to file(s) or image(s), local path(s) to file(s) or image(s), or base64 data of an image. Only the first file/image will be used on Windows Phone.
      url	string
      A URL to share
     */

    this.socialSharing
      .share(
        announcement.message +
          "\n\nVisit http://fhconline.in for our products, or download our app for videos, quizzes, news and pdf and much more at:\n ",
        announcement.title,
        announcement.img,
        playstore
      )
      .then(() => {
        loader.dismiss();
      })
      .catch(() => {
        loader.dismiss();
      });
  }

  getItems(val: string) {
    this.currentSelected = val;
    this.announcements = this.temp;
    if (val !== "all") {
      this.announcements = this.announcements.filter(announcement => {
        return announcement.type === val;
      });
    }
  }
  goToNews(newsUrl) {
    this.iab.create(newsUrl, "_system", "location=yes");
  }
}
