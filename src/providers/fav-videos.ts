import { AuthProvider } from './auth';
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
              private _auth: AuthProvider,
              private toastCtrl: ToastController){}

  addVideoToFavorites(video: Video) {
    this.favoriteVideos.push(video);
    const userId = this._auth.getActiveUser().uid;
    this.storage.set(userId+'/videos', this.favoriteVideos)
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
    const userId = this._auth.getActiveUser().uid;
    this.storage.set(userId+'/videos', this.favoriteVideos)
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
    return this.favoriteVideos.find((videoEl: Video) => {
      return videoEl.id == video.id;
    });
  }

  loadFavoriteVideos(){
    const userId = this._auth.getActiveUser().uid;
    this.storage.get(userId+'/videos')
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

                toast.present();
            }
        );
  }

}
