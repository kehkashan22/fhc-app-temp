import { UserProvider } from './../../providers/user';
import { QuizService } from './../../services/quiz';
import { VideosService } from './../../services/videos';
import { VideosProvider } from './../../providers/videos';
import { Component,  } from '@angular/core';
import { NavController, IonicPage, Events } from 'ionic-angular';
import { Quiz } from "../../data/quiz.interface";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: []
})
export class HomePage {
  analysisPage = 'AnalysisPage';
  libraryPage = 'LibraryPage';
  quizPage = 'QuizPage';
  quizCollection : Quiz[];
  imgPath = "assets/img/";
  imgType = ".jpeg";
   userData: any;

  slides:any[]=[
              {url: this.imgPath + "slide1.jpg", text: "Test Slide1"},
              {url: this.imgPath + "slide2.jpg", text: "Test Slide2"},
              {url: this.imgPath + "slide3.jpg", text: "Test Slide3"}
              ];

  constructor(public navCtrl: NavController,
               private videosProvider: VideosProvider,
               private videosService: VideosService,
               private quizService: QuizService,
               private userProvider : UserProvider,
               private events : Events){}

  ionViewWillLoad() {
    // console.log("User called here!");
    // this.events.publish('user:created', this.userData);
  }

  ngOnInit() {
    this.videosService.loadFavoriteVideos();
    this.quizService.loadQuiz().then((data: Quiz[]) => {
       this.quizCollection = data;
        this.quizService.setQuiz(this.quizCollection);
     });


  }

  ionViewDidLoad(){
     this.videosProvider.getVideos().then((data) => {
       console.log(data);
     });

  this.userProvider.getUser().then((data) => {
           this.userData = data;
           //publish user data to an Event which is published in app.components.ts to fetch user data for side menu
            this.events.publish('user:created', this.userData);
     });

  }

  onPageWillEnter(){
        console.log('****on page will enter messages pane');

    }

  onGoToVideos(){
    this.navCtrl.push(this.libraryPage)
      .catch((error) => console.log('Access denied, Argument was ' + error));
  }

  goToQuiz(){
    console.log("============================================QUIZ============================================");
     console.log(this.quizCollection);
     this.navCtrl.push(this.quizPage)
       .catch((error) => console.log('Access denied, Argument was ' + error));
  }
}
