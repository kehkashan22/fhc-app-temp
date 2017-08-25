import { Quizzes } from './../../data/quizzes.interface';
import { QuizStoreProvider } from './../../providers/quiz-store';
import { Component, ViewChild, OnInit } from '@angular/core';
import { NavParams, ViewController, IonicPage } from 'ionic-angular';
import { Chart } from 'chart.js';
import { QuizStore } from "../../data/quiz/quiz-store.interface";

@IonicPage()
@Component({
  selector: 'page-analysis',
  templateUrl: 'analysis.html',
})
export class AnalysisPage implements OnInit {
  analysis: any;
  labels: string[] = [];
  label: string[] = [];
  data: any;
  quizzes: QuizStore[] = [];
  speedQuizzes: Quizzes[] = [];
  memoryQuizzes: Quizzes[] = [];
  applicationQuizzes: Quizzes[] = [];

  @ViewChild('memoryCanvas') memoryCanvas;
  @ViewChild('speedCanvas') speedCanvas;
  @ViewChild('applicationCanvas') applicationCanvas;

  memoryChart: any;
  speedChart: any;
  applicationChart: any;
  totalSolved: number = 0;
  speedSolved = 0;
  memorySolved = 0;
  applicationSolved = 0;
  speedPercent = 0;

  plugin: any;

  options = {
    legend: {
      display: false
    },
    segmentShowStroke : false,
    rotation: 1 * Math.PI,
    circumference: 1 * Math.PI,
    cutoutPercentage: 75,
    tooltips: {
      enabled: false
    },
    elements: {
        arc: {
            borderWidth: 0
        }
    },
     title: {
            display: true,
            text: '',
            fontSize: 14,
            fontFamily: 'Helvetica',
            position: 'bottom'
        }
  };

  analysisBy: string = '';

  constructor(private navParams: NavParams,
    private _quizStore: QuizStoreProvider,
    private viewCtrl: ViewController) { }

  ngOnInit(): void {
    let analysisId = this.navParams.get('analysisId');
    this._quizStore.loadSolvedQuizCollection();
    let quizStore: QuizStore[] = [];
    quizStore = this._quizStore.getQuizByChapter(analysisId);


    this.quizzes = quizStore;
    console.log(this.quizzes);
    for (let i = 0; i < this.quizzes.length; i++) {
      if (this.quizzes[i].quiz.nature === 'memory') {
        this.memoryQuizzes.push(this.quizzes[i].quiz);
      } else if (this.quizzes[i].quiz.nature === 'speed') {
        this.speedQuizzes.push(this.quizzes[i].quiz);
      } else if (this.quizzes[i].quiz.nature === 'application') {
        this.applicationQuizzes.push(this.quizzes[i].quiz);
      }
    }//for ends

    this.totalSolved = this.quizzes.length;


    this.speedSolved = this.speedQuizzes.length;



    this.memorySolved = this.memoryQuizzes.length;
    this.applicationSolved = this.applicationQuizzes.length;
  }

  ionViewDidLoad() {

    //Chart Plugin
    this.plugin = {
      beforeDraw: function (chart) {
        var width = chart.chart.width,
          height = chart.chart.height,
          ctx = chart.chart.ctx;

        ctx.restore();
        var fontSize = (height / 114).toFixed(2);
        ctx.font = fontSize + "em montserrat";

        ctx.textBaseline = "middle";
        if(typeof(chart.config.data.text) !== undefined){
            var text = chart.config.data.text+"%",
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 1.6;
          ctx.fillText(text, textX, textY);
        }
        ctx.save();
      }
    };



    if(this.speedSolved > 0){
      this.speedPercent = this.totalPercent(this.speedSolved, this.speedQuizzes)
      console.log("speed "+this.speedPercent);
      this.options.title.text = this.setTitle(this.speedPercent);
    }else{
       this.options.title.text = 'Hurry up and solve something, buddy!';
    }

    //speed
    this.speedChart = new Chart(this.speedCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ["Speed", "Improvement"],
        datasets: [{
          data: [this.speedPercent, (100 - this.speedPercent)],
          backgroundColor: [
            'rgba(245, 125, 6, 1.0)',
            'rgba(0, 0, 0, 0.1)'
          ],
          borderColor:
          'rgba(229, 229, 229,1)',
          borderWidth: 1
        }],
        text: this.speedPercent
      },
      options: this.options,
      plugins: [this.plugin]

    });

    //memory
    let memoryPercent = 0;
    if(this.memorySolved > 0){
      memoryPercent = this.totalPercent(this.memorySolved, this.memoryQuizzes);
      this.options.title.text = this.setTitle(memoryPercent);
    }else{
       this.options.title.text = 'Hurry up and solve something, buddy!';
    }
    this.memoryChart = new Chart(this.memoryCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ["Memory", "Improvement"],
        datasets: [{
          data: [memoryPercent, (100 - memoryPercent)],
          backgroundColor: [
            'rgba(23, 165, 153, 1.0)',
            'rgba(0, 0, 0, 0.1)'
          ],
          borderColor:
          'rgba(229, 229, 229,1)',
          borderWidth: 1
        }],
        text: memoryPercent
      },
      options: this.options,
      plugins: [this.plugin]

    });


    //application
    this.options.title.text = 'Application!';
    let applicationPercent = 0;
    if(this.applicationSolved > 0){
      applicationPercent = this.totalPercent(this.applicationSolved, this.applicationQuizzes);
      this.options.title.text = this.setTitle(applicationPercent);
    }else{
       this.options.title.text = 'Hurry up and solve something, buddy!';
    }
    this.applicationChart = new Chart(this.applicationCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ["Application", "Improvement"],
        datasets: [{
          data: [applicationPercent, (100 - applicationPercent)],
          backgroundColor: [
            'rgba(202, 9, 54, 1.0)',
            'rgba(0, 0, 0, 0.1)'
          ],
          borderColor:
          'rgba(229, 229, 229,1)',
          borderWidth: 1,
        }],
        text: applicationPercent
      },
      options: this.options,
      plugins: [this.plugin]

    });
  }

  private setTitle(percent: number){
      if(percent > 70){
        return "Well done! But keep practicing to get even better!";
      }else if(percent < 40){
        return "Step up your game! Practice, practice, practice...";
      }else{
        return "Meh. Give more quizzes to raise your average.";
      }
  }

  onClose(){
    this.viewCtrl.dismiss();
  }

  totalPercent(length, solved){
      let total = 0;
      for(let i = 0; i< length; i++){
        const quizLength = solved[i].questions.length;
        total = solved[i].marks/quizLength + total;
      }
      return Math.floor((total/length)*100);
  }
}
