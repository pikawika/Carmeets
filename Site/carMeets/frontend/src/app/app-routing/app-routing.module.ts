import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { IndexPageComponent } from '../indexPage/indexPage.component';
import { AddMeetingComponent } from '../add-meeting/add-meeting.component';
import { AdminPageComponent } from '../admin-page/admin-page.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: 'home', component: IndexPageComponent },
  { path: 'meet-detail/:id', component: AddMeetingComponent },
  { path: 'register', component: AdminPageComponent },
  { path: 'login', component: AdminPageComponent },
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