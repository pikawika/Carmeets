import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { IndexPageComponent } from '../indexPage/indexPage.component';
import { AddMeetingComponent } from '../add-meeting/add-meeting.component';
import { AdminPageComponent } from '../admin-page/admin-page.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { DetailPageComponent } from '../detail-page/detail-page.component';
import { MeetingResolver } from '../meeting/meeting-resolver';
import { LoginPageComponent } from '../login-page/login-page.component';

const appRoutes: Routes = [
  { path: 'home', component: IndexPageComponent },
  { path: 'meet-detail/:id', component: DetailPageComponent, resolve: {meeting: MeetingResolver} },
  { path: 'registreer', component: AdminPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }