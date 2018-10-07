import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SingleMeetingComponent } from './single-meeting/single-meeting.component';
import { DetailPageComponent } from './detail-page.component';
import { CategoryModule } from '../category/category.module';

@NgModule({
  imports: [
    CommonModule,
    CategoryModule
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
