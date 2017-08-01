import { FlashCardComponent } from './../../components/flash-card/flash-card';

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnalysisPage } from './analysis';

@NgModule({
  declarations: [
    AnalysisPage,
    FlashCardComponent
  ],
  imports: [
    IonicPageModule.forChild(AnalysisPage),
  ],
  exports: [
    AnalysisPage
  ]
})
export class AnalysisPageModule {}
