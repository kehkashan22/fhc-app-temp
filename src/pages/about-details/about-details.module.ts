import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutDetailsPage } from './about-details';

@NgModule({
  declarations: [
    AboutDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutDetailsPage),
  ],
  exports: [
    AboutDetailsPage
  ]
})
export class AboutDetailsPageModule {}
