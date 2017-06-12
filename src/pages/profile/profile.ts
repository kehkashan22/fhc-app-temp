import { StarredPage } from './../starred/starred';
import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  starredPage = StarredPage;
  constructor(private navCtrl: NavController) {}

    onGoToStarred(){
     this.navCtrl.push(this.starredPage)
       .catch((error) => console.log('Access denied, Argument was ' + error));
   }

}
