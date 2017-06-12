import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StarredPage } from './starred';

@NgModule({
  declarations: [
    StarredPage,
  ],
  imports: [
    IonicPageModule.forChild(StarredPage),
  ],
  exports: [
    StarredPage
  ]
})
export class StarredPageModule {}
