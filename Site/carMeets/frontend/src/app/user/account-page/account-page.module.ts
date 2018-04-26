import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AccountPreferencesComponent } from './account-preferences/account-preferences.component';
import { AccountSubmenuComponent } from './account-submenu/account-submenu.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    AccountSettingsComponent,
    AccountPreferencesComponent,
    AccountSubmenuComponent
  ]
})
export class AccountPageModule { }
