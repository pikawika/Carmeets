import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { MeetingComponent } from './meeting/meeting.component';
import { CategoryComponent } from './category/category.component';
import { MeetingFilterPipe } from './meeting-filter.pipe';
import { AddMeetingComponent } from './add-meeting/add-meeting.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IndexPageComponent } from './indexPage/indexPage.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { FooterComponent } from './footer/footer.component';


const appRoutes: Routes = [
  { path: 'home', component: IndexPageComponent },
  { path: 'detail', component: AddMeetingComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'}
];

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
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
