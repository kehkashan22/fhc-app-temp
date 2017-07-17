import { TitlecasePipe } from './titlecase';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YoutubePipe } from './youtube';
import { SortByDatePipe } from './sortByDate.pipe';

@NgModule({
  declarations: [
      YoutubePipe,
      TitlecasePipe,
      SortByDatePipe
  ],
  imports: [
  ],
  exports: [
      YoutubePipe,
      TitlecasePipe,
      SortByDatePipe
  ]
})
export class PipesModule {}
