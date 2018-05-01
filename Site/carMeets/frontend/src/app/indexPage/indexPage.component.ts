import { Component, OnInit } from '@angular/core';
import { MeetingDataService } from '../meeting-data.service';
import { Meeting } from '../meeting/meeting.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-indexPage',
  templateUrl: './IndexPage.component.html',
  styleUrls: ['./IndexPage.component.css']
})
export class IndexPageComponent implements OnInit {
  public filterMeetingName: string;
  public filterDateFormGroup: FormGroup;
  public filterDateStart: Date;
  public filterDateEnd: Date;
  private _meetings: Meeting[];

  

  constructor(private _meetingDataService : MeetingDataService, private filterDateFb: FormBuilder,) { }

  ngOnInit() {
    this.filterDateStart = new Date(new Date().setHours(0,0,0,0));
    this._meetingDataService.meetings.subscribe(data => this._meetings = data);

    this.filterDateFormGroup = this.filterDateFb.group({
      startDate: [
        "",
        [
          Validators.pattern(
            "^(3[01]|[12][0-9]|0[1-9])/(1[0-2]|0[1-9])/[0-9]{4}$"
          )
        ]
      ],
      endDate: [
        "",
        [
          Validators.pattern(
            "^(3[01]|[12][0-9]|0[1-9])/(1[0-2]|0[1-9])/[0-9]{4}$"
          )
        ]
      ]
    });
  }

  get meetings() {
    return this._meetings;
  }

  applyFilterName(filterNaam: string) {
    this.filterMeetingName = filterNaam;
  }

  applyFilterDate() {
    let startDateFrom = this.filterDateFormGroup.value.startDate.split("/");
    if (startDateFrom != null && startDateFrom != ""){
      let startDate = new Date(startDateFrom[2], startDateFrom[1] - 1, startDateFrom[0]);
      this.filterDateStart = startDate;
    } else {
      this.filterDateStart = null;
    }

    let endDateFrom = this.filterDateFormGroup.value.endDate.split("/");
    if (endDateFrom != null && endDateFrom != ""){
      let endDate = new Date(endDateFrom[2], endDateFrom[1] - 1, endDateFrom[0]);
      this.filterDateEnd = endDate;
    } else {
      this.filterDateEnd = null;
    }
    
  }

  


}
