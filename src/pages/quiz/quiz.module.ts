import { TimerComponent } from './../../components/timer/timer';
import { ProgressBarComponent } from './../../components/progress-bar/progress-bar';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizPage } from './quiz';

@NgModule({
  declarations: [
    QuizPage,
    ProgressBarComponent,
    TimerComponent
  ],
  imports: [
    IonicPageModule.forChild(QuizPage),
  ],
  exports: [
    QuizPage,
  ]
})
export class QuizPageModule {}
