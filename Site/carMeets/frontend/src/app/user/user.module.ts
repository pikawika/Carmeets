import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountPageComponent } from './account-page/account-page.component';
import { LoginComponent } from './login-page/login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register-page/register/register.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    AccountPageComponent,
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
