import { AuthProvider } from './../../providers/auth';
import { Videos } from './../../data/videos.interface';
import { LoadingController, NavParams } from 'ionic-angular';
import { VideosProvider } from './../../providers/videos';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-library',
  templateUrl: 'library.html',
})
export class LibraryPage {

  videoCollection: Videos[];
  tempVideos: Videos[]
  videosPage = 'VideosPage';

  constructor(private videosProvider: VideosProvider,
    private loadingController: LoadingController,
    private authProvider: AuthProvider,
    private navParams : NavParams) { }

  ngOnInit() {
   //this.getVideosFromDB();
        this.videoCollection = this.navParams.data;
          this.tempVideos = this.videoCollection;
  }

  doRefresh(refresher) {
    //this.getVideosFromDB();
    setTimeout(() => {
      //console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  getVideoCategoryByTitle(event: any) {
    this.videoCollection = this.tempVideos;
    // Reset items back to all of the items

    let val = event.target.value;

    if (val && val.trim() != '') {
      this.videoCollection = this.videoCollection.filter((videoCollection) => {
        return (videoCollection.setId.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
