import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideosPage } from './videos';
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    VideosPage
  ],
  imports: [
    IonicPageModule.forChild(VideosPage),
    PipesModule
  ],
  exports: [
    VideosPage
  ]
})
export class VideosPageModule {}
