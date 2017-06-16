import { Md5 } from 'ts-md5/dist/md5';
import { UserProvider } from './../../providers/user';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit{

   starredPage = 'StarredPage';
   fullname = '';
   email = '';
   phone = '';
   profilePicture: any = "https://www.gravatar.com/avatar/";
  constructor(private navCtrl: NavController,
              private userProvider : UserProvider,
              private events : Events) {}

  ngOnInit(): void {
     this.userProvider.getUser().then((data) => {
              this.fullname = data.fullName;
              this.email = data.emailId;
              this.phone = data.phoneNumber;
              this.profilePicture = "https://www.gravatar.com/avatar/" +
                                          Md5.hashStr(this.email.toLowerCase());
      });
  }

  onGoToStarred(){
     this.navCtrl.push(this.starredPage)
       .catch((error) => console.log('Access denied, Argument was ' + error));
   }

}
