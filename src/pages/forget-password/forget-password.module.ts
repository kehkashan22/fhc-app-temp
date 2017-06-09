import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgetPasswordPage } from './forget-password';

@NgModule({
  declarations: [
    ForgetPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ForgetPasswordPage),
  ],
  exports: [
    ForgetPasswordPage
  ]
})
export class ForgetPasswordPageModule {}
