import { Component } from '@angular/core';
import { MeetingDataService } from './meeting-data.service';
import { Meeting } from './meeting/meeting.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MeetingDataService]
})
export class AppComponent {
  title = 'CarMeets.be';
  constructor(private _meetingDataService : MeetingDataService) {
  }
  
  get meetings(): Meeting[] {
    return this._meetingDataService.meetings;
  }
}
