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
  chapters: {
    chapterID: string, quiz: {
      quizId: string,
      questions: Quiz[]
    }
  }[] = [];
  quizzesPage='QuizzesPage';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.fa = this.navParams.data;
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
        return (chapters.chapterID.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
