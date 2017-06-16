import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YoutubePipe } from './youtube';

@NgModule({
  declarations: [
      YoutubePipe
  ],
  imports: [
  ],
  exports: [
      YoutubePipe
  ]
})
export class PipesModule {}
