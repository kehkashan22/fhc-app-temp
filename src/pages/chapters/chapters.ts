import { NetworkProvider } from './../../providers/network/network';
import { QuizService } from './../../providers/quiz';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-chapters',
  templateUrl: 'chapters.html',
})
export class ChaptersPage implements OnInit {

  fa: any;
  subjectName: string;
  chapters: any[] = [];
  tempChapters: any[] = [];
  url = '';
  quizzesPage = 'QuizzesPage';
  reportCard = 'ReportCardPage';
  data: {
    course: string,
    stage: string,
    subject: string,
    subjectId: string,
    fa: string,
    url: string
  }
  nothing: boolean = false;
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _loader: LoadingController,
    private _quiz: QuizService,
    private _network: NetworkProvider) {
  }

  ngOnInit() {
    this.loader = this._loader.create({
      spinner: "bubbles",
      content: "Loading Chapters..."
    });
    this.data = this.navParams.data;
    console.log(this.data);
    this.url = this.data.url;
    this.loader.present();
    if (this._network.noConnection()) {
      this.loader.dismiss();
      this._network.showNetworkAlert();
    } else {
      this._quiz.getQuizLibrary(this.url).then((snapshot) => {
        //let sets: Videos[]  = snapshot;
        if (snapshot) {
          this.chapters = snapshot;
          this.tempChapters = this.chapters;
        }
        this.nothing = this.chapters.length > 0 ? false : true;
        this.loader.dismiss();
      });
    }
  }

  ionViewDidLoad() {

    this.subjectName = this.data.subject;
    this.fa = this.data.fa;

  }

  ionViewWillLeave() {
    this.loader.dismiss();
  }

  getChapterByTitle(event: any) {
    this.chapters = this.tempChapters;
    // Reset items back to all of the items

    let val = event.target.value;

    if (val && val.trim() != '') {
      this.chapters = this.chapters.filter((chapters) => {
        return (chapters.chapterId.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  toQuizzes(chapter) {
    this.navCtrl.push(this.quizzesPage, {
      subjectId: this.data.subjectId,
      chapter: chapter
    });
  }

  toReportCard() {
    this.navCtrl.push(this.reportCard, {
      subjectId: this.data.subjectId
    });
  }

  doRefresh(refresher) {
    this._quiz.getQuizLibrary(this.url).then(snapshot => {
      //let sets: Videos[]  = snapshot;
      if (snapshot) {
        this.chapters = snapshot;
        this.tempChapters = this.chapters;
      }
    });
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

}
