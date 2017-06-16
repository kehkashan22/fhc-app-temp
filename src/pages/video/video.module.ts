import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoPage } from './video';
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    VideoPage
  ],
  imports: [
    IonicPageModule.forChild(VideoPage),
    PipesModule
  ],
  exports: [
    VideoPage
  ]
})
export class VideoPageModule {}
