import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportCardPage } from './report-card';
import { FlashCardComponent } from './../../components/flash-card/flash-card';

@NgModule({
  declarations: [
    ReportCardPage,
    FlashCardComponent
  ],
  imports: [
    IonicPageModule.forChild(ReportCardPage),
  ],
  exports: [
    ReportCardPage
  ]
})
export class ReportCardPageModule { }
