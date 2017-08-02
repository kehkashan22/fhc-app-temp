import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChaptersPage } from './chapters';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    ChaptersPage,
  ],
  imports: [
    IonicPageModule.forChild(ChaptersPage),
    PipesModule,
    ComponentsModule
  ],
  exports: [
    ChaptersPage
  ]
})
export class ChaptersPageModule {}
