import { NgModule } from '@angular/core';
import { TimerComponent } from './timer/timer';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { FlashCardComponent } from './flash-card/flash-card';

@NgModule({
  declarations: [
      FlashCardComponent,
      ProgressBarComponent,
      TimerComponent
  ],
  imports: [
  ],
  exports: [
      FlashCardComponent,
      ProgressBarComponent,
      TimerComponent
  ]
})
export class ComponentsModule {}
