import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LayoutModule } from './layout/layout.module';
import { DetailPageModule } from './detail-page/detail-page.module';
import { IndexPageModule } from './indexPage/index-page.module';
import { CategoryModule } from './category/category.module';
import { MeetingModule } from './meeting/meeting.module';
import { UserModule } from './user/user.module';
import { httpInterceptorProviders } from './http-interceptors';
import { MeetingDataService } from './meeting-data.service';
import { MeetingResolver } from './meeting/meeting-resolver';
import { AuthenticationService } from './user/authentication.service';
import { AuthGuardService } from './user/auth-guard.service';

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
