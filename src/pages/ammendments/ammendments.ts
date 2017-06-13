import { Component } from '@angular/core';
import { Videos } from "../../data/videos.interface";
import { VideosProvider } from "../../providers/videos";
import { LoadingController, IonicPage } from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-ammendments',
  templateUrl: 'ammendments.html',
})
export class AmmendmentsPage {

   videoCollection: Videos[];
  tempVideos: Videos[]
  videosPage = 'VideosPage';

  constructor(private videosProvider:  VideosProvider,
              private loadingController: LoadingController) {}

  ngOnInit() {
    // this.videoCollection = videos;
    const loading = this.loadingController.create({
      content: "Loading Videos..."
    });
    this.videosProvider.getAmmendments().then((data: Videos[]) => {
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
