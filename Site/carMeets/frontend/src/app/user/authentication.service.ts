import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Meeting } from "../meeting/meeting.model";

function parseJwt(token) {
  if (!token) {
    return null;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(window.atob(base64));
}

@Injectable()
export class AuthenticationService {
  private readonly _tokenKey = "CarMeetsUser";
  private readonly _urlusers = "/API/users";
  private readonly _urlUpload = "/API/upload";
  private readonly _urlmeeting = "/API/meetings";
  private _user$: BehaviorSubject<string>;

  public redirectUrl: string;

  constructor(private http: HttpClient) {
    let parsedToken = parseJwt(localStorage.getItem(this._tokenKey));
    if (parsedToken) {
      const expires =
        new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date();
      if (expires) {
        localStorage.removeItem(this._tokenKey);
        parsedToken = null;
      }
    }
    this._user$ = new BehaviorSubject<string>(
      parsedToken && parsedToken.username
    );
  }

  get user$(): BehaviorSubject<string> {
    return this._user$;
  }

  get token(): string {
    const localToken = localStorage.getItem(this._tokenKey);
    return !!localToken ? localToken : "";
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post(`${this._urlusers}/login`, { username, password })
      .pipe(
        map((res: any) => {
          const token = res.token;
          if (token) {
            localStorage.setItem(this._tokenKey, token);
            this._user$.next(username);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  logout() {
    if (this.user$.getValue()) {
      localStorage.removeItem(this._tokenKey);
      setTimeout(() => this._user$.next(null));
    }
  }

  register(
    username: string,
    password: string,
    email: string,
    soortenMeetings: string[]
  ): Observable<boolean> {
    return this.http
      .post(`${this._urlusers}/registreer`, {
        username,
        password,
        email,
        soortenMeetings
      })
      .pipe(
        map((res: any) => {
          const token = res.token;
          if (token) {
            localStorage.setItem(this._tokenKey, token);
            this._user$.next(username);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  checkUserNameAvailability(username: string): Observable<boolean> {
    return this.http.post(`${this._urlusers}/checkusername`, { username }).pipe(
      map((item: any) => {
        if (item.username === "alreadyexists") {
          return false;
        } else {
          return true;
        }
      })
    );
  }

  checkEmailAvailability(email: string): Observable<boolean> {
    return this.http.post(`${this._urlusers}/checkemail`, { email }).pipe(
      map((item: any) => {
        if (item.email === "alreadyexists") {
          return false;
        } else {
          return true;
        }
      })
    );
  }

  changeUsername(newUsername: string): Observable<boolean> {
    return this.http
      .post(`${this._urlusers}/changeUsername`, { newUsername })
      .pipe(
        map((res: any) => {
          const token = res.token;
          if (token) {
            localStorage.setItem(this._tokenKey, token);
            this._user$.next(newUsername);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  changePassword(newPassword: string): Observable<boolean> {
    return this.http
      .post(`${this._urlusers}/changePassword`, { newPassword })
      .pipe(
        map((res: any) => {
          const token = res.token;
          if (token) {
            localStorage.setItem(this._tokenKey, token);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  changeEmail(newEmail: string): Observable<boolean> {
    return this.http.post(`${this._urlusers}/changeEmail`, { newEmail }).pipe(
      map((res: any) => {
        const token = res.token;
        if (token) {
          localStorage.setItem(this._tokenKey, token);
          return true;
        } else {
          return false;
        }
      })
    );
  }

  changePreferences(soortenMeetings: string[]): Observable<boolean> {
    return this.http
      .post(`${this._urlusers}/changePreferences`, { soortenMeetings })
      .pipe(
        map((res: any) => {
          if (res.succes) {
            return true;
          } else {
            return false;
          }
        })
      );
  }

  getPreferences(): Observable<string[]> {
    return this.http.get(`${this._urlusers}/getPreferences`).pipe(
      map((res: any) => {
        if (res.soortenMeetings) {
          return res.soortenMeetings;
        } else {
          return null;
        }
      })
    );
  }

  //voorlopig een bool maar kan meeting worden om toe te voegen aan lokale lijst
  addMeeting(meeting: Meeting): Observable<string> {
    return this.http.post(`${this._urlmeeting}/addMeeting`, meeting).pipe(
      map((res: any) => {
        const toegevoegd = res.toegevoegd;
        if (toegevoegd) {
          return toegevoegd;
        } else {
          return null;
        }
      })
    );
  }

  uploadMeetingImg(data: FormData): Observable<string> {
    return this.http.post(`${this._urlUpload}/uploadMeetingImg`, data).pipe(
      map((res: any) => {
        if (res.filename) {
          return res.filename;
        } else {
          return null;
        }
      })
    );
  }

  toggleLiked(idMeeting: string): Observable<string> {
    return this.http
      .post(`${this._urlmeeting}/toggleLiked`, { idMeeting })
      .pipe(
        map((res: any) => {
          if (res.likeAmount != undefined) {
            return res.likeAmount;
          } else {
            return null;
          }
        })
      );
  }

  toggleGoing(idMeeting: string): Observable<string> {
    return this.http.post(`${this._urlmeeting}/toggleGoing`, { idMeeting }).pipe(
      map((res: any) => {
        if (res.goingAmount != undefined) {
          return res.goingAmount;
        } else {
          return null;
        }
      })
    );
  }
}
