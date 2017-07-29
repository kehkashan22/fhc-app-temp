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
  fullname = '';
  email = '';
  phone = '';
  profilePicture: any = '';
  constructor(private navCtrl: NavController,
              private userProvider: UserProvider,
              private events: Events,
              private authProvider: AuthProvider,
              private modalCtrl: ModalController,
              private _loader: LoadingController
  ) { }

  ionViewWillEnter(): void {
    const loader = this._loader.create({
      spinner: "bubbles",
      content: "Loading Profile..."
    });
    loader.present();
      this.userProvider.getUser().then((data: User) => {
        this.fullname = data.fullName;
        this.email = data.emailId;
        this.phone = data.phoneNumber;
        this.profilePicture = "https://www.gravatar.com/avatar/" +
          Md5.hashStr(this.email.toLowerCase());
          loader.dismiss();
      });


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
