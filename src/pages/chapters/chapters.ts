import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Quiz } from "../../data/quiz.interface";

@IonicPage()
@Component({
  selector: 'page-chapters',
  templateUrl: 'chapters.html',
})
export class ChaptersPage {

  fa: any;
  subjectId: string;
  chapters: {
    chapterId: string, quiz: {
      quizId: string,
      questions: Quiz[]
    }
  }[] = [];
  quizzesPage='QuizzesPage';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.subjectId = this.navParams.get('subjectId');
    this.fa = this.navParams.get('fa');
    if (this.fa) {
      this.chapters = this.fa.chapters;
    }
  }

  getChapterByTitle(event: any) {
      this.chapters = this.fa.chapters;
    // Reset items back to all of the items

    let val = event.target.value;

    if (val && val.trim() != '') {
      this.chapters = this.chapters.filter((chapters) => {
        return (chapters.chapterId.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
