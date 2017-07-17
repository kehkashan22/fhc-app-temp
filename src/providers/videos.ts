import library from '../data/library';
/*
  Name - Videos Provider
  Functionality - Provider for all videos and ammendments fetched from server database
  Author - Kehkashan Fazal
  Date - 08/06/2017
*/

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import * as firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';

@Injectable()
export class VideosProvider {
  libraryCollection : any;
  data: any;
  constructor(public http: Http) {
    this.data = null;
  }

  getVideos(token: string) {
     if (this.data) {
       console.log("See this old");
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      console.log("See this new");
      this.http.get('https://ionic-fhc-app.firebaseio.com/videodb.json?auth='+token)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  loadVideos(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.database()
        .ref(url).child('/sets').on('value', snapshot => {
          resolve(snapshot.val());
        });
    });
  }

  getNewVideos() {

    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.http.get('https://ionic-fhc-app.firebaseio.com/video-library.json')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });

  }

  //    loadLibrary(){
  //     this.libraryCollection = library;
  //    if (this.data) {
  //      return Promise.resolve(this.data);
  //    }
  //     return new Promise(resolve => {

  //     //  this.http.put('https://ionic-fhc-app.firebaseio.com/video-library.json', this.libraryCollection)
  //     this.http.put('https://ionic-fhc-app.firebaseio.com/vid-lib2.json', this.vidLib)
  //        .map(res => res.json())
  //        .subscribe(() => {
  //          console.log("Success!");
  //        },
  //        (error)=>{
  //          console.log(error.json());
  //        });
  //    });

  //  }
}
