import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnalysisAnswersPage } from './analysis-answers';

@NgModule({
  declarations: [
    AnalysisAnswersPage,
  ],
  imports: [
    IonicPageModule.forChild(AnalysisAnswersPage),
  ],
  exports: [
    AnalysisAnswersPage
  ]
})
export class AnalysisAnswersPageModule {}
