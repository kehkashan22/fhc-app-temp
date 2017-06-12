import { YoutubePipe } from './../../pipes/youtube';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideosPage } from './videos';

@NgModule({
  declarations: [
    VideosPage,
    YoutubePipe
  ],
  imports: [
    IonicPageModule.forChild(VideosPage),
  ],
  exports: [
    VideosPage
  ]
})
export class VideosPageModule {}
