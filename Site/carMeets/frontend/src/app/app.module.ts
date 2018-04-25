import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { MeetingFilterPipe } from './meeting-filter.pipe';
import { IndexPageComponent } from './indexPage/indexPage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { MeetingDataService } from './meeting-data.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './user/logout/logout.component';
import { AuthGuardService } from './user/auth-guard.service';
import { AuthenticationService } from './user/authentication.service';
import { httpInterceptorProviders } from './http-interceptors/index';
import { LayoutModule } from './layout/layout.module';
import { MeetingComponent } from './indexPage/meeting/meeting.component';
import { AddMeetingComponent } from './user/account-page/add-meeting/add-meeting.component';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { SingleMeetingComponent } from './detail-page/single-meeting/single-meeting.component';
import { LoginPageComponent } from './user/login-page/login-page.component';
import { RegisterPageComponent } from './user/register-page/register-page.component';
import { LoginComponent } from './user/login-page/login/login.component';
import { RegisterComponent } from './user/register-page/register/register.component';
import { MeetingResolver } from './indexPage/meeting/meeting-resolver';
import { AccountPageComponent } from './user/account-page/account-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MeetingComponent,
    CategoryComponent,
    MeetingFilterPipe,
    AddMeetingComponent,
    IndexPageComponent,
    AdminPageComponent,
    PageNotFoundComponent,
    DetailPageComponent,
    SingleMeetingComponent,
    LoginPageComponent,
    RegisterPageComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    AccountPageComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    LayoutModule
  ],
  providers: [httpInterceptorProviders, MeetingDataService, MeetingResolver, AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
