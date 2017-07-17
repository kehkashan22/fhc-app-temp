import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnnouncementsPage } from './announcements';
import { MomentModule } from 'angular2-moment';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    AnnouncementsPage,
  ],
  imports: [
    IonicPageModule.forChild(AnnouncementsPage),
    MomentModule,
    PipesModule
  ],
  exports: [
    AnnouncementsPage
  ]
})
export class AnnouncementsPageModule {}
