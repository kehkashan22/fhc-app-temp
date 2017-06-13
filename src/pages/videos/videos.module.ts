import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideosPage } from './videos';
import { YoutubePipe } from './../../pipes/youtube';

@NgModule({
  declarations: [
    VideosPage
  ],
  imports: [
    IonicPageModule.forChild(VideosPage),
  ],
  exports: [
    VideosPage
  ]
})
export class VideosPageModule {}
