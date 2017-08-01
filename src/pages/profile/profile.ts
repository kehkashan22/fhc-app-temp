import { NetworkProvider } from './../../providers/network/network';
import { User } from './../../data/user.interface';
import { Md5 } from 'ts-md5/dist/md5';
import { LoadingController } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth';
import * as sha1  from 'sha1';
import { UserProvider } from './../../providers/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, Events, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  starredPage = 'StarredPage';
  reportCard = 'ReportCardPage';
  analyseMePage = 'AnalyseMePage';
  fullname = '';
  email = '';
  phone = '';
  profilePicture: any = '';
  loader: any;
  noNetwork: boolean = false;
  constructor(private navCtrl: NavController,
              private userProvider: UserProvider,
              private events: Events,
              private authProvider: AuthProvider,
              private modalCtrl: ModalController,
              private _loader: LoadingController,
              private _network: NetworkProvider
  ) { }

  ionViewWillEnter(): void {
    this.loader = this._loader.create({
      spinner: "bubbles",
      content: "Loading Profile..."
    });
    this.loader.present();
    if (this._network.noConnection()) {
      this.noNetwork = true;
      this.loader.dismiss();
      this._network.showNetworkAlert();
    } else {
      this.userProvider.getUser().then((data: User) => {
        this.fullname = data.fullName;
        this.email = data.emailId;
        this.phone = data.phoneNumber;
        this.profilePicture = "https://www.gravatar.com/avatar/" +
          Md5.hashStr(this.email.toLowerCase());
          this.loader.dismiss();
      });
    }
  }

  ionViewWillLeave(){
    this.loader.dismiss();
  }

  onGoToStarred() {
    this.navCtrl.push(this.starredPage)
      .catch((error) => console.log('Access denied, Argument was ' + error));
  }

  editProfile(){
    //let updateModal = this.modalCtrl.create('EditProfilePage');
    //updateModal.present();
    this.navCtrl.push('EditProfilePage');
  }


}
