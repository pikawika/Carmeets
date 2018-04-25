import { Observable } from "rxjs/Observable";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
  FormControl
} from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { map } from "rxjs/operators";
import { AuthenticationService } from "../../authentication.service";

function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    console.log(control.value);
    return control.value.length < 12
      ? { passwordTooShort: { value: control.value.length } }
      : null;
  };
}

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public user: FormGroup;
  public errorMsg: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.user = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
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
      .login(this.user.value.username, this.user.value.password)
      .subscribe(
        val => {
          if (val) {
            if (this.authenticationService.redirectUrl) {
              this.router.navigateByUrl(this.authenticationService.redirectUrl);
              this.authenticationService.redirectUrl = undefined;
            } else {
              this.router.navigate(["/home"]);
            }
          } else {
            this.errorMsg = `Aanmelden mislukt`;
          }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.errorMsg = `Aanmelden mislukt`;
          } else {
            this.errorMsg = `Aanmelden mislukt`;
          }
        }
      );
  }
}
