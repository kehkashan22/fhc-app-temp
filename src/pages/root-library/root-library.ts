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
    this.caGroup = this._globals.caCollection;
    this.csGroup = this._globals.csCollection;


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
    const url = '/video-library/'+course+'/'+stage+'/'+subject+'/'+type;
    this.navCtrl.push(this.library, {
        url: url,
        subject: subject,
        type: type
    });
  }
}

