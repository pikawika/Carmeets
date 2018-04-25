import { Component, OnInit } from '@angular/core';
import { MeetingDataService } from '../meeting-data.service';
import { Meeting } from '../meeting/meeting.model';

@Component({
  selector: 'app-indexPage',
  templateUrl: './IndexPage.component.html',
  styleUrls: ['./IndexPage.component.css'],
  providers: [MeetingDataService]
})
export class IndexPageComponent implements OnInit {
  public filterMeetingName: string;
  private _meetings: Meeting[];

  constructor(private _meetingDataService : MeetingDataService) { }

  ngOnInit() {
    this._meetingDataService.meetings
    .subscribe(data => this._meetings = data);
  }

  get meetings() {
    return this._meetings;
  }

  applyFilter(filter: string) {
    this.filterMeetingName = filter;
  }
}
