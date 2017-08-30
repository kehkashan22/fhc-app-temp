import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportCardPage } from './report-card';
import { RoundProgressModule } from "angular-svg-round-progressbar/dist";


@NgModule({
  declarations: [
    ReportCardPage
  ],
  imports: [
    IonicPageModule.forChild(ReportCardPage),
    ComponentsModule,
    RoundProgressModule
  ],
  exports: [
    ReportCardPage
  ]
})
export class ReportCardPageModule { }
