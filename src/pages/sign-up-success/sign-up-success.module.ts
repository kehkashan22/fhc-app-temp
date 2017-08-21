import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignUpSuccessPage } from './sign-up-success';

@NgModule({
  declarations: [
    SignUpSuccessPage,
  ],
  imports: [
    IonicPageModule.forChild(SignUpSuccessPage),
  ],
  exports: [
    SignUpSuccessPage
  ]
})
export class SignUpSuccessPageModule {}
