import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnalyseMePage } from './analyse-me';

//Videogular
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import { ProgressBarComponent } from "../../components/progress-bar/progress-bar";

@NgModule({
  declarations: [
    AnalyseMePage,
    ProgressBarComponent
  ],
  imports: [
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    IonicPageModule.forChild(AnalyseMePage),
    PipesModule

  ],
  exports: [
    AnalyseMePage
  ]
})
export class AnalyseMePageModule {}
