import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../../../authentication.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

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

  //werkt niet doet niets
  onSubmitUsernameChange() {

}
