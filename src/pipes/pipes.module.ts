import { ConcatPipe } from './concat';
import { TitlecasePipe } from './titlecase';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YoutubePipe } from './youtube';
import { SortByDatePipe } from './sortByDate.pipe';

@NgModule({
  declarations: [
      YoutubePipe,
      TitlecasePipe,
      SortByDatePipe,
      ConcatPipe
  ],
  imports: [
  ],
  exports: [
      YoutubePipe,
      TitlecasePipe,
      SortByDatePipe,
      ConcatPipe
  ]
})
export class PipesModule {}
