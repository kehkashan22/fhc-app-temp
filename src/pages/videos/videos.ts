import { AnalyticsProvider } from './../../providers/analytics/analytics';
import { LoadingController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
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
  private youtube: YoutubeVideoPlayer,
private socialSharing: SocialSharing,
private _loader: LoadingController,
private _analytics: AnalyticsProvider) {}

  ionViewDidLoad() {
    this.videoGroup = this.navParams.data;
    this._analytics.analyse('videos');
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

  shareSheetShare(video){
    const yourl = "https://youtu.be/"+video.url;
    let loader = this._loader.create({
      spinner: 'bubbles',
      content: 'breathe in...breathe out...'
    });
    loader.present();
    this.socialSharing.share("Head over to CA Farooq Haque's YouTube channel for more such content:\n", null, null, yourl).then(() => {
      loader.dismiss();
    }).catch(() => {
      loader.dismiss();
    });
  }

}
