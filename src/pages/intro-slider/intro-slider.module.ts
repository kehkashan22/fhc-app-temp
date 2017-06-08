import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IntroSlider } from './intro-slider';

@NgModule({
  declarations: [
    IntroSlider,
  ],
  imports: [
    IonicPageModule.forChild(IntroSlider),
  ],
  exports: [
    IntroSlider
  ]
})
export class IntroSliderModule {}
