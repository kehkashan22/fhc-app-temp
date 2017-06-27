import { Videos } from './../../data/videos.interface';
import { VideosService } from '../../providers/fav-videos';
import { Video } from './../../data/video.interface';

import { Component} from '@angular/core';
import { AlertController, IonicPage, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html',
})
export class VideosPage{
  videoGroup: Videos;

  constructor(
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private videosService: VideosService) {}

  ionViewDidLoad() {
    this.videoGroup = this.navParams.data;
  }

  onAddToFavorites(selectedvideo: Video) {
    const alert = this.alertCtrl.create({
      title: 'Add video',
      subTitle: 'Are you sure?',
      message: 'Are you sure you want to add the video?',
      buttons: [
        {
          text: 'Yes, go ahead',
          handler: () => {
            this.videosService.addVideoToFavorites(selectedvideo);
          }
        },
        {
          text: 'No, I changed my mind!',
          role: 'cancel',
          handler: () => {
            console.log('Cancelled!');
          }
        }
      ]
    });

    alert.present();
  }

  onRemoveFromFavorites(video: Video) {
    this.videosService.removeVideoFromFavorites(video);
  }

  isFavorite(video: Video) {
    return this.videosService.isVideoFavorite(video);
  }
}
