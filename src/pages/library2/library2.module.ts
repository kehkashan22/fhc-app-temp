import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Library2Page } from './library2';

@NgModule({
  declarations: [
    Library2Page,
  ],
  imports: [
    IonicPageModule.forChild(Library2Page),
    PipesModule
  ],
  exports: [
    Library2Page
  ]
})
export class Library2PageModule {}
