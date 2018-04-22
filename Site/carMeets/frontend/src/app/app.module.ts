import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { MeetingComponent } from './meeting/meeting.component';
import { CategoryComponent } from './category/category.component';
import { MeetingFilterPipe } from './meeting-filter.pipe';
import { AddMeetingComponent } from './add-meeting/add-meeting.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IndexPageComponent } from './indexPage/indexPage.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { MeetingDataService } from './meeting-data.service';
import { MeetingResolver } from './meeting/meeting-resolver';
import { SingleMeetingComponent } from './single-meeting/single-meeting.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';




@NgModule({
  declarations: [
    AppComponent,
    MeetingComponent,
    CategoryComponent,
    MeetingFilterPipe,
    AddMeetingComponent,
    NavbarComponent,
    IndexPageComponent,
    AdminPageComponent,
    FooterComponent,
    PageNotFoundComponent,
    DetailPageComponent,
    SingleMeetingComponent,
    LoginPageComponent,
    RegisterPageComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [MeetingDataService, MeetingResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
