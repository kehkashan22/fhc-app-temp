import { Videos } from './../../data/videos.interface';
import { VideosService } from '../../providers/fav-videos';
import { Video } from './../../data/video.interface';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player'
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
    private videosService: VideosService,
  private youtube: YoutubeVideoPlayer) {}

  ionViewDidLoad() {
    this.videoGroup = this.navParams.data;
  }

  onAddToFavorites(selectedvideo: Video) {
    const alert = this.alertCtrl.create({
      title: 'Add video to Starred?',
      //subTitle: 'This video ',
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
    const alert = this.alertCtrl.create({
      title: 'Remove video from Starred Videos?',
      subTitle: 'Are you sure?',
      message: 'This will remove videos from your Starred Videos',
      buttons: [
        {
          text: 'Yes, go ahead',
          handler: () => {
            this.videosService.removeVideoFromFavorites(video);
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

  isFavorite(video: Video) {
    return this.videosService.isVideoFavorite(video);
  }

  openVideo(id){
    this.youtube.openVideo(id);
  }

}
