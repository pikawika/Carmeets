import { Component, OnInit } from '@angular/core';
import { ValidatorFn, AbstractControl, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../../../authentication.service';

function passwordValidator(length: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    return control.value.length < length
      ? {
          passwordTooShort: {
            requiredLength: length,
            actualLength: control.value.length
          }
        }
      : null;
  };
}

function comparePasswords(control: AbstractControl): { [key: string]: any } {
  const password = control.get('newPassword');
  const confirmPassword = control.get('confirmPassword');
  return password.value === confirmPassword.value
    ? null
    : { passwordsDiffer: true };
}

@Component({
  selector: 'app-account-settings-passchange',
  templateUrl: './account-settings-passchange.component.html',
  styleUrls: ['./account-settings-passchange.component.css']
})
export class AccountSettingsPasschangeComponent implements OnInit {
  public wachtwoordMessage: string;
  public changePasswordFormgroup: FormGroup;

  get passwordControl(): FormControl {
    return <FormControl>this.changePasswordFormgroup.get('passwordGroup').get('newPassword');
  }

  constructor(private changePasswordFb: FormBuilder, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.changePasswordFormgroup = this.changePasswordFb.group({
      passwordGroup: this.changePasswordFb.group(
        {
          oldPassword : ['', Validators.required],
          //minimaal lengte 7 chars
          newPassword: ['', [Validators.required, passwordValidator(7)]],
          confirmPassword: ['', Validators.required]
        },
        { validator: comparePasswords }
      )
    });
  }

  onSubmitPasswordChange() {
    this.authenticationService
      .changePassword(this.passwordControl.value)
      .subscribe(
        val => {
          if (val) {
            this.wachtwoordMessage = `Wachtwoord gewijzigd!`;
          }else{
            this.wachtwoordMessage = `Fout tijdens wijzigen wachtwoord!`;
          }
        },
        (error: HttpErrorResponse) => {
          this.wachtwoordMessage = `Fout tijdens wijzigen wachtwoord`;
        }
      );
  }

}
