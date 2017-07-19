import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdatePasswordPage } from './update-password';

@NgModule({
  declarations: [
    UpdatePasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdatePasswordPage),
  ],
  exports: [
    UpdatePasswordPage
  ]
})
export class UpdatePasswordPageModule {}
