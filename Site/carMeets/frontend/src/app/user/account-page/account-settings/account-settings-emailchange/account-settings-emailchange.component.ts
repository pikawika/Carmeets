import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../../../authentication.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-account-settings-emailchange',
  templateUrl: './account-settings-emailchange.component.html',
  styleUrls: ['./account-settings-emailchange.component.css']
})
export class AccountSettingsEmailchangeComponent implements OnInit {
  public emailMessage: string;
  public changeEmailFormgroup: FormGroup;

  get emailControl(): FormControl {
    return <FormControl>this.changeEmailFormgroup.get('newEmail');
  }

  constructor(private authenticationService: AuthenticationService, private changeEmailfb: FormBuilder) { }

  ngOnInit() {
    this.changeEmailFormgroup = this.changeEmailfb.group({
      newEmail: [
        '',
        [Validators.required, Validators.email],
        this.serverSideValidateEmail()
      ]
    });
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

  onSubmitEmailChange() {
    this.authenticationService
    .changeEmail(this.changeEmailFormgroup.value.newEmail)
    .subscribe(
      val => {
        if (val) {
          this.emailMessage = `Email gewijzigd!`;
        }else{
          this.emailMessage = `Fout tijdens wijzigen Email!`;
        }
      },
      (error: HttpErrorResponse) => {
        this.emailMessage = `Fout tijdens wijzigen Email`;
      }
    );
  }

}
