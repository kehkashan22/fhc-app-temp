import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { TimerComponent } from './timer/timer';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { FlashCardComponent } from './flash-card/flash-card';
import { IonicModule } from "ionic-angular";

@NgModule({
  declarations: [
      FlashCardComponent,
      ProgressBarComponent,
      TimerComponent
  ],
  imports: [
      IonicModule,
  ],
  exports: [
      FlashCardComponent,
      ProgressBarComponent,
      TimerComponent
  ]
})
export class ComponentsModule {}
