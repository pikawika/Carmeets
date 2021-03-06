import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
  FormControl
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../../authentication.service';

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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: FormGroup;
  public errorMsg: string;
  public soortenMeetings: string[];

  get passwordControl(): FormControl {
    return <FormControl>this.user.get('passwordGroup').get('password');
  }

  get emailControl(): FormControl {
    return <FormControl>this.user.get('email');
  }

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.soortenMeetings = [
      "American Muscle",
      "Audio",
      "British",
      "Cabrio",
      "Car limbo",
      "Classics",
      "Daily",
      "Drifting",
      "Exoctics",
      "French",
      "German",
      "Grand tourers",
      "Hatchbacks",
      "Hypercars",
      "Italian",
      "JDM",
      "Kit cars",
      "Korean",
      "Lowered",
      "Movie cars",
      "Off-road",
      "Oldtimers",
      "Racing",
      "Show and shine",
      "Sportcars",
      "Stock",
      "Supercars",
      "Tuning",
      "Underground",
      "VAG"
    ];
    this.user = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email],
        this.serverSideValidateEmail()
      ],
      username: [
        '',
        [Validators.required, Validators.minLength(4)],
        this.serverSideValidateUsername()
      ],
      passwordGroup: this.fb.group(
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

  onSubmit() {
    this.authenticationService
      .register(this.user.value.username, this.passwordControl.value, this.emailControl.value, this.soortenMeetings)
      .subscribe(
        val => {
          if (val) {
            this.router.navigate(['/account/voorkeuren']);
          }
        },
        (error: HttpErrorResponse) => {
          this.errorMsg = `Error ${
            error.status
          } Fout tijdens het registreren van: ${this.user.value.username}
          }`;
        }
      );
  }
}
