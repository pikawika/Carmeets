import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../authentication.service';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

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
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password.value === confirmPassword.value
    ? null
    : { passwordsDiffer: true };
}

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})

export class AccountSettingsComponent implements OnInit {
  public wachtwoordMessage: string;
  public changePasswordFormgroup: FormGroup;
  
  get passwordControl(): FormControl {
    return <FormControl>this.changePasswordFormgroup.get('passwordGroup').get('password');
  }

  constructor(private changePasswordFb: FormBuilder, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.changePasswordFormgroup = this.changePasswordFb.group({
      passwordGroup: this.changePasswordFb.group(
        {
          //minimaal lengte 7 chars
          password: ['', [Validators.required, passwordValidator(7)]],
          confirmPassword: ['', Validators.required]
        },
        { validator: comparePasswords }
      )
    });
  }

  serverSideValidateUsername(): ValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any }> => {
      return this.authenticationService
        .checkUserNameAvailability(control.value)
        .pipe(
          map(available => {
            if (available) {
              return null;
            }
            return { userAlreadyExists: true };
          })
        );
    };
  }

  serverSideValidateEmail(): ValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any }> => {
      return this.authenticationService
        .checkEmailAvailability(control.value)
        .pipe(
          map(available => {
            if (available) {
              return null;
            }
            return { userAlreadyExists: true };
          })
        );
    };
  }

  onSubmitPasswordChange() {
    this.authenticationService
      .changePassword(this.passwordControl.value)
      .subscribe(
        val => {
          if (val) {
            this.wachtwoordMessage = `Wachtwoord gewijzigd!`;
          }
        },
        (error: HttpErrorResponse) => {
          this.wachtwoordMessage = `Fout tijdens het veranderen van het wachtwoord`;
        }
      );
  }

}
