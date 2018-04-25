import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from '../category/category.component';
import { IndexPageComponent } from './indexPage.component';
import { MeetingFilterPipe } from '../meeting-filter.pipe';
import { MeetingModule } from '../meeting/meeting.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MeetingModule,
    RouterModule
  ],
  declarations: [
    IndexPageComponent,
    MeetingFilterPipe
  ],
  exports: [
    IndexPageComponent
  ]
})
export class IndexPageModule { }
