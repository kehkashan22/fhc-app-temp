import { IabProvider } from './../../providers/iab/iab';
import { VideosService } from './../../providers/fav-videos';
import { QuizStoreProvider } from './../../providers/quiz-store';
import { Chart } from 'chart.js';
import { NetworkProvider } from './../../providers/network/network';
import { User } from './../../data/user.interface';
import { Md5 } from 'ts-md5/dist/md5';
import { LoadingController } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth'
import { UserProvider } from './../../providers/user';
import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, Events, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit {


  @ViewChild('lineCanvas') lineCanvas;

  lineChart: any;
  starredPage = 'StarredPage';
  reportCard = 'ReportCardPage';
  analyseMePage = 'AnalyseMePage';
  fullname = '';
  email = '';
  phone = '';
  profilePicture: any = '';
  loader: any;
  noNetwork: boolean = false;
  solvedQuizLen: number = 0;
  starredVidsLen: number = 0;
  solvedQuizzes: any;
  gravatar_url: string = '';
  quizLibraryPage = "QuizLibraryPage";

  constructor(private navCtrl: NavController,
    private userProvider: UserProvider,
    private events: Events,
    private authProvider: AuthProvider,
    private modalCtrl: ModalController,
    private _loader: LoadingController,
    private _network: NetworkProvider,
    private _quizStore: QuizStoreProvider,
    private _videosStore: VideosService,
    private _iab: IabProvider
  ) { }

  ngOnInit(): void {
    this._quizStore.loadSolvedQuizCollection();
    this._videosStore.loadFavoriteVideos();
    this.solvedQuizzes = this._quizStore.getSolvedQuizCollection();
    this.solvedQuizLen = this.solvedQuizzes.length;
    this.starredVidsLen = this._videosStore.getFavoriteVideos().length;
  }
  ionViewWillEnter(): void {

    this.loader = this._loader.create({
      spinner: "bubbles",
      content: "Loading Profile..."
    });
    this.loader.present();
    if (this._network.noConnection()) {
      this.noNetwork = true;
      this.loader.dismiss();
      this._network.showNetworkAlert();
    } else {
      this.userProvider.getUser().then((data: User) => {
        this.fullname = data.fullName;
        this.email = data.emailId;
        this.phone = data.phoneNumber;
        this.profilePicture = "https://www.gravatar.com/avatar/" +
          Md5.hashStr(this.email.toLowerCase()) + "?d=https%3A%2F%2Fs3-ap-southeast-1.amazonaws.com%2Ffhc.app%2Fnotif.jpg";
        this.loader.dismiss();

        let lineData: number[] = [];
        for (let i = 0; i < this.solvedQuizLen; i++) {
          lineData.push(this.solvedQuizzes[i].quiz.marks*100/this.solvedQuizzes[i].quiz.questions.length);
        }
        //draw-chart-here
        if (lineData.length > 0) {

          this.lineChart = new Chart(this.lineCanvas.nativeElement, {

            type: 'line',
            data: {
              labels:lineData,
              datasets: [
                {
                  label: "Percent scored in each quiz",
                  fill: true,
                  backgroundColor: "rgba(78, 151, 196, 0.4)",
                  borderColor: "rgba(78, 151, 196, 1)",
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderWidth: 1,
                  pointBorderColor: "rgba(78, 151, 196, 1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointRadius: 0,
                  data: lineData,
                }
              ]
            },
            options: {
              legend: {
                position: "bottom"
              },
              scales: {
                yAxes: [{
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: 'Percentage (%)'
            }
          }],
                xAxes: [{
                  gridLines: {
                    display: false
                  },
                  ticks: {
                    display: false
                  }
                }]
              }
            }

          });
        }
      });
    }
  }

  ionViewWillLeave() {
    this.loader.dismiss();
  }

  onGoToStarred() {
    this.navCtrl.push(this.starredPage);
  }

  editProfile() {
    this.navCtrl.push('EditProfilePage');
  }

  changePicture(){
   //let url = "https://signup.wordpress.com/signup/?ref=oauth2&user_email="+this.email.toLowerCase()+"&oauth2_redirect=bf551c93d83b96478db51481a9cbe97e%40https%3A%2F%2Fpublic-api.wordpress.com%2Foauth2%2Fauthorize%2F%3Fclient_id%3D1854%26response_type%3Dcode%26blog_id%3D0%26state%3D331f9ecba5fcab15e2168e1231f7be2a4b1b8cd24dd6f90b3672fb5159d7b590%26redirect_uri%3Dhttps%253A%252F%252Fen.gravatar.com%252Fconnect%252F%253Faction%253Drequest_access_token%26jetpack-code%26jetpack-user-id%3D0%26action%3Doauth2-login&wpcom_connect=1";
    let url = "http://en.gravatar.com/";
    this._iab.redirect(url);
  }

  visitStore(){
    this._iab.redirectToStore();
  }


}
