/*
  Name - Favorite Service
  Functionality - A video service to fetch, store, load and delete favorite videos
  Author - Kehkashan Fazal
  Date - 08/06/2017
*/

import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Video } from "../data/video.interface";
import { ToastController } from "ionic-angular";

@Injectable()
export class VideosService {
  private favoriteVideos: Video[] = [];

  constructor(private storage: Storage,
              private toastCtrl: ToastController){}

  addVideoToFavorites(video: Video) {
    this.favoriteVideos.push(video);
    this.storage.set('videos', this.favoriteVideos)
        .then()
        .catch(
          err => {
            this.favoriteVideos.splice(this.favoriteVideos.indexOf(video), 1);
          }
        );
  }

  removeVideoFromFavorites(video: Video) {
    const position = this.favoriteVideos.findIndex((videoEl: Video) => {
      return videoEl.id == video.id;
    });
    this.favoriteVideos.splice(position, 1);
    this.storage.set('videos', this.favoriteVideos)
        .then()
        .catch(
          err => {
            this.favoriteVideos.push(video);
          }
        );
  }

  getFavoriteVideos() {
    return this.favoriteVideos.slice();
  }

  isVideoFavorite(video: Video) {
    return this.favoriteVideos.findIndex((videoEl: Video) => {
      return videoEl.id == video.id;
    });
  }

  loadFavoriteVideos(){
    this.storage.get('videos')
        .then(
          (videos: Video[]) => {
            this.favoriteVideos = videos != null ? videos : [];
          }
        )
        .catch(
          err => {
              let toast = this.toastCtrl.create({
                  message: 'Could not load list of favorite videos. Please try again!',
                  duration: 3000,
                  position: 'middle'
                });

                toast.onDidDismiss(() => {
                  console.log('Dismissed toast');
                });

                toast.present();
            }
        );
  }
}
