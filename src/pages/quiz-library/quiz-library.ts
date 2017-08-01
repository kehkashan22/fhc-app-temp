import { GlobalsProvider } from './../../providers/globals/globals';
import { QuizLibrary } from './../../data/quiz-library.interface';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { QuizService } from "../../providers/quiz";
import { AuthProvider } from "../../providers/auth";
import { Quiz } from "../../data/quiz.interface";

@IonicPage()
@Component({
  selector: 'page-quiz-library',
  templateUrl: 'quiz-library.html',
})
export class QuizLibraryPage implements OnInit {

  quizLibrary: QuizLibrary[];
  caLibrary:any[] = [];
  csLibrary: any[] = [];
  quizCollection: Quiz[];
  quizPage = 'QuizPage';
  show: string = '';
  courseId: string = '';
  course: string = "ca";
  chaptersPage = 'ChaptersPage';

  constructor(public navCtrl: NavController,
    private quizService: QuizService,
    private authProvider: AuthProvider,
    private loader: LoadingController,
    private _globals: GlobalsProvider) {
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
     this.caLibrary = this._globals.caCollection;
    this.csLibrary = this._globals.csCollection;

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

  toChapters(course, stage, subject, subjectId, fa) {
    const url = '/quiz-library/'+course+'/'+stage+'/'+subjectId+'/'+fa;
    let data = {
      course: course,
      stage: stage,
      subject: subject,
      subjectId: subjectId,
      fa: fa,
      url: url
    }

    this.navCtrl.push(this.chaptersPage, data);
  }

}
