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
import { MeetingResolver } from '../meeting/meeting-resolver';
import { AccountSettingsComponent } from '../user/account-page/account-settings/account-settings.component';
import { AccountPreferencesComponent } from '../user/account-page/account-preferences/account-preferences.component';
import { AddMeetingPageComponent } from '../user/account-page/add-meeting-page/add-meeting-page.component';
import { PreferenceResolver } from '../user/account-page/account-preferences/preference-resolver';
import { LikedMeetingsComponent } from '../user/account-page/liked-meetings/liked-meetings.component';
import { GoingMeetingsComponent } from '../user/account-page/going-meetings/going-meetings.component';
import { LikedMeetingsResolver } from '../user/account-page/liked-meetings/liked-meetings-resolver';
import { GoingMeetingsResolver } from '../user/account-page/going-meetings/going-meetings-resolver';

const appRoutes: Routes = [
  { path: 'home', component: IndexPageComponent, resolve: {dbSoortenMeetings: PreferenceResolver}},
  { path: 'meet-detail/:id', component: DetailPageComponent, resolve: {meeting: MeetingResolver} },

  { path: 'registreer', component: RegisterPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'logout', component: LogoutComponent },
  
  { path: 'account', canActivate: [ AuthGuardService ], redirectTo: 'account/instellingen', pathMatch: 'full' },
  { path: 'account/instellingen', canActivate: [ AuthGuardService ], component: AccountSettingsComponent },
  { path: 'account/voorkeuren', canActivate: [ AuthGuardService ], component: AccountPreferencesComponent, resolve: {dbSoortenMeetings: PreferenceResolver} },
  { path: 'account/likedMeetings', canActivate: [ AuthGuardService ], component: LikedMeetingsComponent, resolve: {likedMeetings: LikedMeetingsResolver} },
  { path: 'account/goingMeetings', canActivate: [ AuthGuardService ], component: GoingMeetingsComponent, resolve: {goingMeetings: GoingMeetingsResolver} },

  { path: 'meetingToevoegen', canActivate: [ AuthGuardService ], component: AddMeetingPageComponent },
  

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