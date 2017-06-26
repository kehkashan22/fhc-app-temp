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
  caLibrary: QuizLibrary;
  csLibrary: QuizLibrary;
  quizCollection: Quiz[];
  quizPage = 'QuizPage';
  show: string = '';
  courseId: string = '';
  course: string = "ca";
  chaptersPage = 'ChaptersPage';

  constructor(public navCtrl: NavController,
    private quizService: QuizService,
    private authProvider: AuthProvider,
    private loader: LoadingController) {
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    const loader = this.loader.create({
      spinner: 'bubbles',
      content: "Loading Quiz..."
    });
    loader.present();

    this.authProvider.getActiveUser().getIdToken().then((token: string) => {
      this.quizService.getQuizLibrary(token).subscribe((data: QuizLibrary[]) => {
        loader.dismiss();
        this.quizLibrary = data;
        this.caLibrary = this.quizLibrary[0];
        this.csLibrary = this.quizLibrary[1];
      });
    },
      error => {
        console.log(error);
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

  toChapters(fa: any, subjectId: string) {
    this.navCtrl.push(this.chaptersPage, {
      fa: fa,
      subjectId: subjectId
    });
  }

}
