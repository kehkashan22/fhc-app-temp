import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizPage } from './quiz';
import { ComponentsModule } from "../../components/components.module";
import { RoundProgressModule } from "angular-svg-round-progressbar/dist";

@NgModule({
  declarations: [
    QuizPage,
  ],
  imports: [
    IonicPageModule.forChild(QuizPage),
    ComponentsModule,
    RoundProgressModule
  ],
  exports: [
    QuizPage,
  ]
})
export class QuizPageModule {}
