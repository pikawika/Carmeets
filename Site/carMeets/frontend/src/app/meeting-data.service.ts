import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Meeting } from './meeting/meeting.model';

@Injectable()
export class MeetingDataService {
  private readonly _urlmeeting = "/API/meetings";

  constructor(private _http: HttpClient) {
    
  }

  get meetings(): Observable<Meeting[]> {
    return this._http
      .get(`${this._urlmeeting}/alleMeetings`)
      .pipe(map((list: any[]): Meeting[] => list.map(Meeting.fromJSON)));
  }

  getMeeting(id: string) {
    const theUrl = `${this._urlmeeting}/singleMeeting/${id}`;
    return this._http.get(theUrl).pipe(map(Meeting.fromJSON));
  }

}
