import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoPage } from './video';
import { YoutubePipe } from './../../pipes/youtube';

@NgModule({
  declarations: [
    VideoPage,
    YoutubePipe
  ],
  imports: [
    IonicPageModule.forChild(VideoPage),
  ],
  exports: [
    VideoPage
  ]
})
export class VideoPageModule {}
