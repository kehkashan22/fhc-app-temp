import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizzesPage } from './quizzes';

@NgModule({
  declarations: [
    QuizzesPage,
  ],
  imports: [
    IonicPageModule.forChild(QuizzesPage),
  ],
  exports: [
    QuizzesPage
  ]
})
export class QuizzesPageModule {}
