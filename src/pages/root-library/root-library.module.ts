import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RootLibraryPage } from './root-library';

@NgModule({
  declarations: [
    RootLibraryPage,
  ],
  imports: [
    IonicPageModule.forChild(RootLibraryPage),
  ],
  exports: [
    RootLibraryPage
  ]
})
export class RootLibraryPageModule {}
