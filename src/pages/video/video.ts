import { Component } from '@angular/core';
import { NavParams, ViewController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {
  text: string;
  url: string;

  constructor(private viewCtrl: ViewController,
              private navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.text = this.navParams.get('text');
    this.url = this.navParams.get('url');
  }

  onClose(remove = false) {
    this.viewCtrl.dismiss(remove);
  }
}
