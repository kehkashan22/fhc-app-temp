import { QuizService } from './../../providers/quiz';
import { Quizzes } from './../../data/quizzes.interface';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-chapters',
  templateUrl: 'chapters.html',
})
export class ChaptersPage implements OnInit{

  fa: any;
  subjectName: string;
  chapters;
  tempChapters: any[] = [];
  url = '';
  quizzesPage='QuizzesPage';
  reportCard = 'ReportCardPage';
  data: {
      course: string,
      stage: string,
      subject: string,
      subjectId: string,
      fa: string,
      url: string
    }

  constructor(public navCtrl: NavController, public navParams: NavParams,
                private _loader: LoadingController,
                private _quiz: QuizService) {
  }

 ngOnInit() {
    const loader = this._loader.create({
      spinner: "bubbles",
      content: "Loading Quiz..."
    });
    this.data = this.navParams.data;
    console.log(this.data);
    this.url = this.data.url;
      loader.present();
      this._quiz.getQuizLibrary(this.url).then((snapshot) => {
       //let sets: Videos[]  = snapshot;
        if (snapshot){
          console.log(snapshot);
          this.chapters = snapshot;
          this.tempChapters = this.chapters;
        }
        loader.dismiss();
      });
  }

  ionViewDidLoad() {
    this.subjectName = this.data.subject;
    this.fa = this.data.fa;


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

  toQuizzes(chapter){
    this.navCtrl.push(this.quizzesPage, {
      subjectId: this.data.subjectId,
      chapter: chapter
    });
  }

  toReportCard(){
    this.navCtrl.push(this.reportCard, {
      subjectId: this.data.subjectId
    });
  }

}
