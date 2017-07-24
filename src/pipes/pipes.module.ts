import { TitlecasePipe } from './titlecase';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YoutubePipe } from './youtube';

@NgModule({
  declarations: [
      YoutubePipe,
      TitlecasePipe,
  ],
  imports: [
  ],
  exports: [
      YoutubePipe,
      TitlecasePipe,
  ]
})
export class PipesModule {}
