import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizLibraryPage } from './quiz-library';

@NgModule({
  declarations: [
    QuizLibraryPage,
  ],
  imports: [
    IonicPageModule.forChild(QuizLibraryPage),
  ],
  exports: [
    QuizLibraryPage
  ]
})
export class QuizLibraryPageModule {}
