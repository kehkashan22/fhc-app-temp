import { GlobalsProvider } from './../../providers/globals/globals';
import { QuizStoreProvider } from './../../providers/quiz-store';
import { Chart } from 'chart.js';
import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuizStore } from "../../data/quiz/quiz-store.interface";

@IonicPage()
@Component({
  selector: 'page-report-card',
  templateUrl: 'report-card.html',
})
export class ReportCardPage implements OnInit {
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;

  barChart: any;
  doughnutChart: any;

  totalSolved: number = 0;
  speedSolved = 0;
  memorySolved = 0;
  applicationSolved = 0;
  speedPercent = 0;

  speedData: number[] = [];
  memoryData: number[] = [];
  applicationData: number[] = [];

  quizzes: QuizStore[] = [];
  speedQuizzes: QuizStore[] = [];
  memoryQuizzes: QuizStore[] = [];
  applicationQuizzes: QuizStore[] = [];

  subjectId = '';

  percentage: number = 0;
  percentClass: string = 'c100 p50';

  overall = "Why don't you give a quiz to get your own personalised results!";
  analysisA = "";
  analysisB ="";
  analysisC = "";


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _quizStore: QuizStoreProvider,
    private _globals: GlobalsProvider) {
  }

  ngOnInit(): void {
    this.subjectId = this.navParams.get('subjectId');


    this.quizzes = this._quizStore.getQuizBySubject(this.subjectId);
    if (this.quizzes.length > 0) {
      for (let i = 0; i < this.quizzes.length; i++) {
        if (this.quizzes[i].quiz.nature === 'memory') {
          this.memoryQuizzes.push(this.quizzes[i]);
        } else if (this.quizzes[i].quiz.nature === 'speed') {
          this.speedQuizzes.push(this.quizzes[i]);
        } else if (this.quizzes[i].quiz.nature === 'application') {
          this.applicationQuizzes.push(this.quizzes[i]);
        }
      }
    }


    //Now i need average of scores by type of chapter from speed, application and memory, where order is:
    //0: Memory, 1: Application, 2: Speed

    this.dataLoad('memory', this.memoryQuizzes);
    this.dataLoad('speed', this.speedQuizzes);
    this.dataLoad('application', this.applicationQuizzes);


  }

  dataLoad(type: string, quizStore: QuizStore[]) {
    //get all memory data, divide it into A, B and C (calculate average for each and store in memoryData array)
    let totalA = 0;
    let totalB = 0;
    let totalC = 0;
    let lengthA = 0, lengthB = 0, lengthC = 0;
    let data: number[] = [];
    for (let i = 0; i < quizStore.length; i++) {
      if (quizStore[i].chapterType === 'a') {
        totalA = totalA + (quizStore[i].quiz.marks / quizStore[i].quiz.questions.length);
        lengthA++;
      } else if (quizStore[i].chapterType === 'b') {
        totalB = totalB + (quizStore[i].quiz.marks / quizStore[i].quiz.questions.length);
        lengthB++;
      } else if (quizStore[i].chapterType === 'c') {
        totalC = totalC + (quizStore[i].quiz.marks / quizStore[i].quiz.questions.length);
        lengthC++;
      }
    }

    data.push((Math.floor((totalA / lengthA) * 100)) | 0);
    data.push((Math.floor((totalB / lengthB) * 100)) | 0);
    data.push((Math.floor((totalC / lengthC) * 100)) | 0);

    if (type === 'memory') {
      this.memoryData = data;
    } else if (type === 'speed') {
      this.speedData = data;
    } else if (type === 'application') {
      this.applicationData = data;
    }

  }

  ionViewDidLoad() {

    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: ["A", "B", "C"],
        datasets: [{
          label: 'Memory',
          data: this.memoryData,
          backgroundColor: 'rgba(0, 92, 156, 0.5)',
          borderColor: 'rgba(0, 92, 156, 1)',
          borderWidth: 1
        },
        {
          label: 'Application',
          data: this.applicationData,
          backgroundColor: 'rgba(255, 209, 102, 0.2)',
          borderColor: 'rgba(255, 209, 102, 1)',
          borderWidth: 1
        },
        {
          label: 'Speed',
          data: this.speedData,
          backgroundColor: 'rgba(6, 214, 160, 0.2)',
          borderColor: 'rgba(6, 214, 160, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              steps: 10,
              stepSize: 20,
              stepValue: 10,
              max: 100
            },
            scaleLabel: {
              display: true,
              labelString: 'Percentage (%)'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Breakup of scores by Chapter and Quiz Type'
            }
          }],
        },
        events: false,
        tooltips: {
          enabled: false
        },
        animation: {
          onComplete: function () {
            var ctx = this.chart.ctx;
            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
            ctx.fillStyle = "black";
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';

            this.data.datasets.forEach(function (dataset) {
              for (var i = 0; i < dataset.data.length; i++) {
                for (var key in dataset._meta) {
                  var model = dataset._meta[key].data[i]._model;
                    ctx.fillText(dataset.data[i] + "%", model.x, model.y - 5);

                }
              }
            });
          }
        }
      }

    });

    this.getPerformancePercent();
    this.getClassString(this.percentage);
    this.generateReport();
  }

  getPerformancePercent() {
    let sum = 0;
    for (var i = 0; i < this.memoryData.length; sum += (this.memoryData[i] / 100) * this._globals.memoryMatrix[i], i++);
    for (var i = 0; i < this.applicationData.length; sum += (this.applicationData[i] / 100) * this._globals.applicationMatrix[i], i++);
    for (var i = 0; i < this.speedData.length; sum += (this.speedData[i] / 100) * this._globals.speedMatrix[i], i++);
    this.percentage = Math.floor(sum);
  }

    private getClassString(per) {
    let perInt = +per | 0;

    if (perInt >= 60) {
      this.percentClass = 'c100 p' + perInt + ' green ';
    } else if (perInt < 40) {
      this.percentClass = 'c100 p' + perInt;
    } else {
      this.percentClass = 'c100 p' + perInt + ' orange ';
    }

  }

  private generateReport(){
      if(this.percentage > 40){
        this.overall = "You have a good chance of passing, but make sure that you concentrate on important chapters to ensure that you come out on top!";
      }else{
        this.overall = "You have a long way to go in terms of clearing your exam. Lots of practice is required in a structured manner."
      }

  }

}
