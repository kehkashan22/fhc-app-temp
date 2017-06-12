import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AmmendmentsPage } from './ammendments';

@NgModule({
  declarations: [
    AmmendmentsPage,
  ],
  imports: [
    IonicPageModule.forChild(AmmendmentsPage),
  ],
  exports: [
    AmmendmentsPage
  ]
})
export class AmmendmentsPageModule {}
