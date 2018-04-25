import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { IndexPageComponent } from './indexPage/indexPage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MeetingDataService } from './meeting-data.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './user/logout/logout.component';
import { AuthGuardService } from './user/auth-guard.service';
import { AuthenticationService } from './user/authentication.service';
import { httpInterceptorProviders } from './http-interceptors/index';
import { LayoutModule } from './layout/layout.module';
import { AddMeetingComponent } from './user/account-page/add-meeting/add-meeting.component';
import { LoginPageComponent } from './user/login-page/login-page.component';
import { RegisterPageComponent } from './user/register-page/register-page.component';
import { LoginComponent } from './user/login-page/login/login.component';
import { RegisterComponent } from './user/register-page/register/register.component';
import { MeetingResolver } from './meeting/meeting-resolver';
import { AccountPageComponent } from './user/account-page/account-page.component';
import { DetailPageModule } from './detail-page/detail-page.module';
import { IndexPageModule } from './indexPage/index-page.module';
import { CategoryModule } from './category/category.module';
import { MeetingModule } from './meeting/meeting.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    DetailPageModule,
    IndexPageModule,
    CategoryModule,
    MeetingModule,
    UserModule
  ],
  providers: [httpInterceptorProviders, MeetingDataService, MeetingResolver, AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
