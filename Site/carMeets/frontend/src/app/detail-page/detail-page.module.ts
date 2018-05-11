import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
  ],
  providers: [
    DatePipe
  ]
})
export class DetailPageModule { }
