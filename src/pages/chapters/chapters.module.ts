import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChaptersPage } from './chapters';

@NgModule({
  declarations: [
    ChaptersPage,
  ],
  imports: [
    IonicPageModule.forChild(ChaptersPage),
    PipesModule
  ],
  exports: [
    ChaptersPage
  ]
})
export class ChaptersPageModule {}
