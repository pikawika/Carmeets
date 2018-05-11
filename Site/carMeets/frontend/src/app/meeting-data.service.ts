import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { map, catchError } from "rxjs/operators";
import { Meeting } from "./meeting/meeting.model";
import { Router } from "@angular/router";

@Injectable()
export class MeetingDataService {
  private readonly _urlmeeting = "/API/meetings";

  constructor(private _http: HttpClient, private router: Router) {}

  get meetings(): Observable<Meeting[]> {
    console.log("called");
    return this._http.get(`${this._urlmeeting}/alleMeetings`).pipe(
      map((list: any[]): Meeting[] => list.map(Meeting.fromJSON)),
      catchError((err: any) => {
        this.redirectTo404();
        return Observable.throw(err.statusText);
      })
    );
  }

  getMeeting(id: string) {
    const theUrl = `${this._urlmeeting}/singleMeeting/${id}`;
    return this._http.get(theUrl).pipe(map(Meeting.fromJSON),
    catchError((err: any) => {
      this.redirectTo404();
      return Observable.throw(err.statusText);
    }));
  }

  redirectTo404() {
    this.router.navigate(["404"]);
  }
}
