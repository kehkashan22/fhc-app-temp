import { IonicPage } from 'ionic-angular';
import { VideosService } from '../../providers/fav-videos';
import { Video } from './../../data/video.interface';
import { Component, OnInit } from '@angular/core';
import { ModalController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-starred',
  templateUrl: 'starred.html',
})
export class StarredPage implements OnInit{
  videoLib = 'RootLibraryPage';

  ngOnInit(): void {
    this.videos = this.videosService.getFavoriteVideos();
  }


  videos: Video[];
  starredPage: 'StarredPage';
  constructor(private videosService: VideosService,
              private modalCtrl: ModalController) {

  }

//  ionViewWillEnter() {
//      this.videos = this.videosService.getFavoriteVideos();
//    }

  onViewVideo(video: Video) {
    const modal = this.modalCtrl.create('VideoPage', video);
    modal.present();
    modal.onDidDismiss((remove: boolean) => {
      if (remove) {
        this.onRemoveFromFavorites(video);
      }
    });
  }

  onRemoveFromFavorites(video: Video) {
    this.videosService.removeVideoFromFavorites(video);
    // this.videos = this.videosService.getFavoritevideos();
    const position = this.videos.findIndex((videoEl: Video) => {
      return videoEl.id == video.id;
    });
    this.videos.splice(position, 1);
  }

  noVideo() {
    return this.videos.length == 0 ? true : false;
  }
}
