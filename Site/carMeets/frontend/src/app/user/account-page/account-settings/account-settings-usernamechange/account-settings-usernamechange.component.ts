import { Component, OnInit } from '@angular/core';
import { ValidatorFn, AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../../../authentication.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-account-settings-usernamechange',
  templateUrl: './account-settings-usernamechange.component.html',
  styleUrls: ['./account-settings-usernamechange.component.css']
})
export class AccountSettingsUsernamechangeComponent implements OnInit {
  public usernameMessage: string;
  public changeUsernameFormgroup: FormGroup;

  constructor(private authenticationService: AuthenticationService, private changeUsernamefb: FormBuilder) { }
  

  ngOnInit() {
    this.changeUsernameFormgroup = this.changeUsernamefb.group({
      newUsername: [
        '',
        [Validators.required, Validators.minLength(4)],
        this.serverSideValidateUsername()
      ]
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

   //werkt nog niet
   onSubmitUsernameChange() {
    this.authenticationService
    .changePassword(this.changeUsernameFormgroup.value.username)
    .subscribe(
      val => {
        if (val) {
          this.usernameMessage = `Wachtwoord gewijzigd!`;
        }else{
          this.usernameMessage = `Fout tijdens wijzigen wachtwoord!`;
        }
      },
      (error: HttpErrorResponse) => {
        this.usernameMessage = `Fout tijdens wijzigen wachtwoord`;
      }
    );
  }

}
