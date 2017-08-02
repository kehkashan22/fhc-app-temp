import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportCardPage } from './report-card';


@NgModule({
  declarations: [
    ReportCardPage
  ],
  imports: [
    IonicPageModule.forChild(ReportCardPage),
    ComponentsModule
  ],
  exports: [
    ReportCardPage
  ]
})
export class ReportCardPageModule { }
