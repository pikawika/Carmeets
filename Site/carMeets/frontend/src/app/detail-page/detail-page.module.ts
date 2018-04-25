import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleMeetingComponent } from './single-meeting/single-meeting.component';
import { DetailPageComponent } from './detail-page.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SingleMeetingComponent,
    DetailPageComponent
  ],
  exports: [
    DetailPageComponent
  ]
})
export class DetailPageModule { }
