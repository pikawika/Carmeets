import { Injectable } from '@angular/core';
import { Meeting } from './meeting/meeting.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class MeetingDataService {
  private readonly _apiUrl = '/API/';

  constructor(private _http: HttpClient) {
    
  }

  get meetings(): Observable<Meeting[]> {
    return this._http
      .get(`${this._apiUrl}meetings/`)
      .pipe(map((list: any[]): Meeting[] => list.map(Meeting.fromJSON)));
  }

  addMeeting(meeting: Meeting): Observable<Meeting> {
    return this._http
      .post(`${this._apiUrl}meetings/`, meeting)
      .pipe(map(Meeting.fromJSON));
  }

  deleteMeeting(rec) {
    return this._http
      .delete(`${this._apiUrl}meeting/${rec.id}`)
      .pipe(map(Meeting.fromJSON));
  }

  getMeeting(id: string) {
    const theUrl = `${this._apiUrl}meeting/${id}`;
    return this._http.get(theUrl).pipe(map(Meeting.fromJSON));
  }

}
