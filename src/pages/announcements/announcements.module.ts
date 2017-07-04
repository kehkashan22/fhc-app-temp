import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnnouncementsPage } from './announcements';

@NgModule({
  declarations: [
    AnnouncementsPage,
  ],
  imports: [
    IonicPageModule.forChild(AnnouncementsPage),
  ],
  exports: [
    AnnouncementsPage
  ]
})
export class AnnouncementsPageModule {}
