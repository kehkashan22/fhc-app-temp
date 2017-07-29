import { LoaderProvider } from './../../providers/loader';
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

  videoCollection: Videos[] = [];
  tempVideos: Videos[] = [];
  videosPage = 'VideosPage';
  nothing: boolean = false;
  url = '';
  subject = '';
  type = '';
  constructor(private _video: VideosProvider,
    private _loader: LoadingController,
    private _auth: AuthProvider,
    private navParams: NavParams) { }

  ngOnInit() {
    const loader = this._loader.create({
      spinner: "bubbles",
      content: "Loading Videos..."
    });
    this.url = this.navParams.get('url');
    this.subject = this.navParams.get('subject');
    this.type = this.navParams.get('type');
    loader.present();
    this._video.loadVideos(this.url).then(snapshot => {
      //let sets: Videos[]  = snapshot;
      if (snapshot) {
        console.log(snapshot);
        this.videoCollection = snapshot;
        this.tempVideos = this.videoCollection;
      }
       if (this.videoCollection.length === 0) {
          this.nothing = true;
        }
      loader.dismiss();
    });
  }

  doRefresh(refresher) {
    this._video.loadVideos(this.url).then(snapshot => {
      //let sets: Videos[]  = snapshot;
      if (snapshot) {
        this.videoCollection = snapshot;
        this.tempVideos = this.videoCollection;
      }
    });
    setTimeout(() => {
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
