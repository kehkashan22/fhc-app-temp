import { Videos } from './../../data/videos.interface';
import { Library } from './../../data/library.interface';
import { Component } from '@angular/core';
import { VideosProvider } from "../../providers/videos";
import { LoadingController, IonicPage } from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-root-library',
  templateUrl: 'root-library.html',
})
export class RootLibraryPage {

  library = 'LibraryPage';

  libraryCollection: Library[];
  tempVideos: Library[];
  videoCollection: Videos[];
  videosPage = 'VideosPage';
  courseId: string = '';
  course: string = "ca";
  show: string = '';
  caGroup : any;
  csGroup : any;

  constructor(private videosProvider: VideosProvider,
    private loadingController: LoadingController) { }

  ngOnInit() {
    // this.libraryCollection = videos;
    const loader = this.loadingController.create({
      spinner: "bubbles",
      content: "Loading Videos..."
    });
    loader.present();
    this.videosProvider.getNewVideos().then((data: Library[]) => {
      console.log(data);
      loader.dismiss();
      if (data) {
        this.libraryCollection = data;
        this.tempVideos = this.libraryCollection;
       this.caGroup = this.libraryCollection[0];
        this.csGroup = this.libraryCollection[1];
      } else {
        this.libraryCollection = [];
        this.tempVideos = [];
      }
    });


  }
  goTo(courseId: string) {
    this.courseId = courseId;
  }

  toggleDetails(data: string) {
    if (this.show === data) {
      this.show = '';
    } else {
      this.show = data;
    }
  }
}

