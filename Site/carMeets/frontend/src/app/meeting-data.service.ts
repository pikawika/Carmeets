import { Injectable } from '@angular/core';
import { Meeting } from './meeting/meeting.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class MeetingDataService {
  private readonly _apiUrl = '/API/meetings/';

  constructor(private _http: HttpClient) {
    
  }

  get meetings(): Observable<Meeting[]> {
    return this._http
      .get(this._apiUrl)
      .pipe(
        map((list: any[]): Meeting[] =>
          list.map(item => 
            new Meeting(item.name, item.date, item.gemeente, item.shortDescription, item.fullDescription, item.categories, item.site)
          )
        )
      );
  }

  addMeeting(meeting): Observable<Meeting> {
    return this._http.post(this._apiUrl, meeting.toJSON())
    .pipe(map((data:any) => new Meeting(data.name, data.date, data.gemeente, data.shortDescription, data.fullDescription, data.categories, data.site)))
  }

}
