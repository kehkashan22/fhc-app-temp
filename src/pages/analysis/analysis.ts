import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
@IonicPage()
@Component({
  selector: 'page-analysis',
  templateUrl: 'analysis.html',
})
export class AnalysisPage implements OnInit{
  analysis : any;
  labels : string[] = [];
  label : string [] = [];
  data : any;

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;

  barChart: any;
  doughnutChart: any;

  constructor(public navCtrl: NavController, private navParams : NavParams) {}

  ngOnInit(): void {
    this.analysis = this.navParams.data;

    this.data = {
        labels: ["DT", "IDT", "Tax"],
        datasets: [{
          label: 'Quiz 1',
          data: [],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor:
            'rgba(255,99,132,1)',
          borderWidth: 1
        },{
        label: 'Quiz 2',
          data: [],
          backgroundColor:
            'rgba(54, 162, 235, 0.2)',
          borderColor:
            'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
        ]
      }

    for(var i=0; i<this.analysis.length ; i++){

    }
  }

  ionViewDidLoad() {

    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: this.data,
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

  }

}
