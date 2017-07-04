import { GlobalsProvider } from './../../providers/globals/globals';
import { Videos } from './../../data/videos.interface';
import { Library } from './../../data/library.interface';
import { Component } from '@angular/core';
import { VideosProvider } from "../../providers/videos";
import { LoadingController, IonicPage, NavController } from "ionic-angular";

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
  caGroup: any;
  csGroup : any;

  constructor(private _videos: VideosProvider,
    private _loader: LoadingController, private _globals: GlobalsProvider,
    private navCtrl : NavController) { }

  ngOnInit() {
    // this.libraryCollection = videos;
    // const loader = this._loader.create({
    //   spinner: "bubbles",
    //   content: "Loading Videos..."
    // });
    // loader.present();
    // this._videos.getNewVideos().then((data: Library[]) => {
    //   console.log(data);
    //   loader.dismiss();
    //   if (data) {
    //     this.libraryCollection = data;
    //     this.tempVideos = this.libraryCollection;
    //    this.caGroup = this.libraryCollection[0];
    //     this.csGroup = this.libraryCollection[1];
    //   } else {
    //     this.libraryCollection = [];
    //     this.tempVideos = [];
    //   }
    // });

    this.caGroup = this._globals.caCollection;
    console.log(this.caGroup);
    this.csGroup = this._globals.csCollection;
    console.log(this.csGroup);


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

  goToVideos(course, stage, subject, type){
    if(type==="case laws"){
      type = 'case_laws';
    }
    const url = '/vid-lib2/'+course+'/'+stage+'/'+subject+'/'+type;
    console.log(url);
    this.navCtrl.push(this.library, url)
  }
}

