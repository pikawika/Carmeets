import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login-page/login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register-page/register/register.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountPageModule } from './account-page/account-page.module';
import { AppRoutingModule } from '../app-routing/app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountPageModule,
    AppRoutingModule
  ],
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent
  ],
  exports: [
  ]
})
export class UserModule { }
