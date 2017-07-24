import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnnouncementsDetailPage } from './announcements-detail';
import { LocalNotifications } from '@ionic-native/local-notifications';

@NgModule({
  declarations: [
    AnnouncementsDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AnnouncementsDetailPage),
  ],
  exports: [
    AnnouncementsDetailPage
  ],
  providers: [ LocalNotifications ]
})
export class AnnouncementsDetailPageModule {}
