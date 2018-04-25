import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { IndexPageComponent } from '../indexPage/indexPage.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { DetailPageComponent } from '../detail-page/detail-page.component';
import { LoginPageComponent } from '../user/login-page/login-page.component';
import { RegisterPageComponent } from '../user/register-page/register-page.component';
import { AuthGuardService } from '../user/auth-guard.service';
import { LogoutComponent } from '../user/logout/logout.component';
import { AccountPageComponent } from '../user/account-page/account-page.component';
import { MeetingResolver } from '../meeting/meeting-resolver';

const appRoutes: Routes = [
  { path: 'home', component: IndexPageComponent },
  { path: 'account', canActivate: [ AuthGuardService ], component: AccountPageComponent },
  { path: 'meet-detail/:id', component: DetailPageComponent, resolve: {meeting: MeetingResolver} },
  { path: 'registreer', component: RegisterPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'logout', component: LogoutComponent },
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