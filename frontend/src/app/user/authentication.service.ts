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
  private readonly _urlmeetings = "/API/meetings";
  private _user$: BehaviorSubject<string>;
  private _AmountLikedNex7D$: BehaviorSubject<number>;
  private _AmountGoingNex7D$: BehaviorSubject<number>;

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
    this._AmountLikedNex7D$ = new BehaviorSubject<number>(
      0
    );
    this._AmountGoingNex7D$ = new BehaviorSubject<number>(
      0
    );
  }

  get user$(): BehaviorSubject<string> {
    return this._user$;
  }

  get amountLikedNext7D$(): BehaviorSubject<number> {
    return this._AmountLikedNex7D$;
  }

  get amountGoingNext7D$(): BehaviorSubject<number> {
    return this._AmountGoingNex7D$;
  }

  get token(): string {
    const localToken = localStorage.getItem(this._tokenKey);
    return !!localToken ? localToken : "";
  }

  get isLoggedIn(): boolean {
    return (localStorage.getItem(this._tokenKey) != null);
  }

  get idFromToken(): string {
    if (this.token == ""){
      return "-1";
    }
    let idUitToken = new Buffer(this.token.split(".")[1], "base64").toString();
    return JSON.parse(idUitToken)._id;
  }

  get roleFromToken(): string {
    if (this.token == ""){
      return "-1";
    }
    let roleUitToken = new Buffer(this.token.split(".")[1], "base64").toString();
    return JSON.parse(roleUitToken).role;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post(`${this._urlusers}/login`, { username, password })
      .pipe(
        map((res: any) => {
          const token = res.token;
          if (token) {
            localStorage.setItem(this._tokenKey, token);
            this.setTotalGoingNext7D();
            this.setTotalLikedNext7D();
            this._user$.next(res.username);
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
    return this.http.post(`${this._urlmeetings}/addMeeting`, meeting).pipe(
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
      .post(`${this._urlmeetings}/toggleLiked`, { idMeeting })
      .pipe(
        map((res: any) => {
          if (res.likeAmount != undefined) {
            this.setTotalLikedNext7D();
            return res.likeAmount;
          } else {
            return null;
          }
        })
      );
  }

  toggleGoing(idMeeting: string): Observable<string> {
    return this.http.post(`${this._urlmeetings}/toggleGoing`, { idMeeting }).pipe(
      map((res: any) => {
        if (res.goingAmount != undefined) {
          this.setTotalGoingNext7D();
          return res.goingAmount;
        } else {
          return null;
        }
      })
    );
  }

  getLikedMeetings(): Observable<Meeting[]> {
    return this.http.get(`${this._urlmeetings}/likedMeetings`).pipe(
      map((res: any) => {
        if (res) {
          return res;
        } else {
          return null;
        }
      })
    );
  }

  getGoingMeetings(): Observable<Meeting[]> {
    return this.http.get(`${this._urlmeetings}/goingMeetings`).pipe(
      map((res: any) => {
        if (res) {
          return res;
        } else {
          return null;
        }
      })
    );
  }

  setTotalLikedNext7D() {
    return this.http.get(`${this._urlmeetings}/getTotalLikedNext7D`).pipe(
      map((res: any) => {
        if (res.likeAmount != undefined) {
          return res.likeAmount;
        } else {
          return null;
        }
      })
    ).subscribe(val => {
      if (val != null) {
        this._AmountLikedNex7D$.next(val);
      }
    });;
  }


  setTotalGoingNext7D() {
    return this.http.get(`${this._urlmeetings}/getTotalGoingNext7D`).pipe(
      map((res: any) => {
        if (res.goingAmount != undefined) {
          return res.goingAmount;
        } else {
          return null;
        }
      })
    ).subscribe(val => {
      if (val != null) {
        this._AmountGoingNex7D$.next(val);
      }
    });;
  }

  deleteMeeting(idMeeting: string): Observable<boolean> {
    return this.http
      .post(`${this._urlmeetings}/deleteMeeting`, { idMeeting })
      .pipe(
        map((res: any) => {
          if (res.deleted === true) {
            this.setTotalGoingNext7D();
            this.setTotalLikedNext7D();
            return true;
          } else {
            return false;
          }
        })
      );
  }

}
