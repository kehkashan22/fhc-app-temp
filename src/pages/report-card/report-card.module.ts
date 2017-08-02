import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportCardPage } from './report-card';
<<<<<<< HEAD
=======
import { ComponentsModule } from './../../components/components.module';
>>>>>>> upstream/Kehkashan


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
