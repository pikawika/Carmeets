import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AccountPreferencesComponent } from './account-preferences/account-preferences.component';
import { AccountSubmenuComponent } from './account-submenu/account-submenu.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountSettingsPasschangeComponent } from './account-settings/account-settings-passchange/account-settings-passchange.component';
import { AccountSettingsUsernamechangeComponent } from './account-settings/account-settings-usernamechange/account-settings-usernamechange.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    AccountSettingsComponent,
    AccountPreferencesComponent,
    AccountSubmenuComponent,
    AccountSettingsPasschangeComponent,
    AccountSettingsUsernamechangeComponent
  ]
})
export class AccountPageModule { }
