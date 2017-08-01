import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RootLibraryPage } from './root-library';
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    RootLibraryPage
  ],
  imports: [
    IonicPageModule.forChild(RootLibraryPage),
    PipesModule
  ],
  exports: [
    RootLibraryPage
  ]
})
export class RootLibraryPageModule {}
