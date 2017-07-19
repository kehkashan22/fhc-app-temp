import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnnouncementsDetailPage } from './announcements-detail';

@NgModule({
  declarations: [
    AnnouncementsDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AnnouncementsDetailPage),
  ],
  exports: [
    AnnouncementsDetailPage
  ]
})
export class AnnouncementsDetailPageModule {}
