import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingComponent } from './meeting.component';
import { CategoryModule } from '../category/category.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../user/login-page/login/login.component';
import { RegisterComponent } from '../user/register-page/register/register.component';

@NgModule({
  imports: [
    CommonModule,
    CategoryModule,
    RouterModule
  ],
  declarations: [
    MeetingComponent
  ],
  exports: [
    MeetingComponent
  ]
})
export class MeetingModule { }
