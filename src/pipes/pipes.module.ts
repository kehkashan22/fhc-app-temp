import { ConcatPipe } from './concat';
import { TitlecasePipe } from './titlecase';
import { NgModule } from '@angular/core';
import { YoutubePipe } from './youtube';

@NgModule({
  declarations: [
      YoutubePipe,
      TitlecasePipe,
      ConcatPipe
  ],
  imports: [
  ],
  exports: [
      YoutubePipe,
      TitlecasePipe,
      ConcatPipe
  ]
})
export class PipesModule {}
