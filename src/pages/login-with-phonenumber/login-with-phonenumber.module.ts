import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginWithPhonenumberPage } from './login-with-phonenumber';

@NgModule({
  declarations: [
    LoginWithPhonenumberPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginWithPhonenumberPage),
  ],
  exports: [
    LoginWithPhonenumberPage
  ]
})
export class LoginWithPhonenumberPageModule {}
