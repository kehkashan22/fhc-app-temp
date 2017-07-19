import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SolvedQuizzesPage } from './solved-quizzes';

@NgModule({
  declarations: [
    SolvedQuizzesPage,
  ],
  imports: [
    IonicPageModule.forChild(SolvedQuizzesPage),
  ],
  exports: [
    SolvedQuizzesPage
  ]
})
export class SolvedQuizzesPageModule {}
