import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-quizzes',
  templateUrl: 'quizzes.html',
})
export class QuizzesPage {
  chapters: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.chapters = this.navParams.data;
  }

}
