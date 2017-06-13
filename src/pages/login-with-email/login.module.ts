import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginWithEmailPage } from './login';

@NgModule({
  declarations: [
    LoginWithEmailPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginWithEmailPage),
  ],
  exports: [
    LoginWithEmailPage
  ]
})
export class LoginModule {}
