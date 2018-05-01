import { Component, OnInit } from '@angular/core';
import { MeetingDataService } from '../meeting-data.service';
import { Meeting } from '../meeting/meeting.model';

@Component({
  selector: 'app-indexPage',
  templateUrl: './IndexPage.component.html',
  styleUrls: ['./IndexPage.component.css']
})
export class IndexPageComponent implements OnInit {
  public filterMeetingName: string;
  public filterDateStart: Date;
  public filterDateEnd: Date;
  private _meetings: Meeting[];

  constructor(private _meetingDataService : MeetingDataService) { }

  ngOnInit() {
    this._meetingDataService.meetings
    .subscribe(data => this._meetings = data);
  }

  get meetings() {
    return this._meetings;
  }

  applyFilterName(filterNaam: string) {
    this.filterMeetingName = filterNaam;
  }


}
