import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlashCardComponent } from './flash-card';

@NgModule({
  declarations: [
    FlashCardComponent,
  ],
  imports: [
    IonicPageModule.forChild(FlashCardComponent),
  ],
  exports: [
    FlashCardComponent
  ]
})
export class FlashCardComponentModule {}
