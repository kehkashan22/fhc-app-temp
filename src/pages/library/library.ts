import { Videos } from './../../data/videos.interface';
import { LoadingController } from 'ionic-angular';
import { VideosProvider } from './../../providers/videos';
import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { VideosPage } from "../videos/videos";
//import { Video } from "../../data/video.interface";
import videos from "../../data/videos";

@IonicPage()
@Component({
  selector: 'page-library',
  templateUrl: 'library.html',
})
export class LibraryPage {

  videoCollection: Videos[];
  tempVideos: Videos[]
  videosPage = VideosPage;

  constructor(private videosProvider:  VideosProvider,
              private loadingController: LoadingController) {}

  ngOnInit() {
    this.videoCollection = videos;
    const loading = this.loadingController.create({
      content: "Loading Videos..."
    });
    this.videosProvider.getVideos().then((data: Videos[]) => {
      console.log(data);
      if(data){
        this.videoCollection = data;
        this.tempVideos = this.videoCollection;
      }else{
        this.videoCollection = [];
        this.tempVideos = [];
      }

    });

  }

   ionViewDidLoad(){

    // this.videosProvider.getVideos().then((data) => {
    //   console.log(data);
    //   this.videoCollection = data;
    // });

  }

  getVideoCategoryByTitle(event: any){
    this.videoCollection = this.tempVideos;
// Reset items back to all of the items
    //this.videoCollection = videos;

    let val = event.target.value;

    if (val && val.trim() != '') {
      this.videoCollection = this.videoCollection.filter((videoCollection) => {
        return (videoCollection.category.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
