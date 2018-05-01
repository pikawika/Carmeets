import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from '../category/category.component';
import { IndexPageComponent } from './indexPage.component';
import { MeetingFilterPipe } from '../meeting-filter.pipe';
import { MeetingModule } from '../meeting/meeting.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MeetingModule,
    RouterModule,
    ReactiveFormsModule
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
