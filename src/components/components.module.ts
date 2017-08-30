import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { TimerComponent } from './timer/timer';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { FlashCardComponent } from './flash-card/flash-card';
//import { RoundProgressComponent } from 'angular-svg-round-progressbar';
@NgModule({
  declarations: [
      FlashCardComponent,
      ProgressBarComponent,
      TimerComponent,
    //RoundProgressComponent
  ],
  imports: [
      IonicModule,
  ],
  exports: [
      FlashCardComponent,
      ProgressBarComponent,
      TimerComponent,
      //RoundProgressComponent
  ]
})
export class ComponentsModule {}
