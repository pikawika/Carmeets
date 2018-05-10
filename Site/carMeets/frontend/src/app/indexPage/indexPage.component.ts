import { Component, OnInit } from '@angular/core';
import { MeetingDataService } from '../meeting-data.service';
import { Meeting } from '../meeting/meeting.model';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-indexPage',
  templateUrl: './IndexPage.component.html',
  styleUrls: ['./IndexPage.component.css']
})
export class IndexPageComponent implements OnInit {
  private _meetings: Meeting[];
  public filterMeetingName: string;
  public filterDateFormGroup: FormGroup;
  public filterDateStart: Date;
  public filterDateEnd: Date;
  public soortenMeetings: string[];
  public dbSoortenMeetings: string[];
  public soortenMeetingsFilter: string[];


  constructor(private _meetingDataService : MeetingDataService, private filterDateFb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(item=>this.dbSoortenMeetings = item['dbSoortenMeetings']);
    this.soortenMeetings = [
      "American Muscle",
      "Audio",
      "British",
      "Cabrio",
      "Car limbo",
      "Classics",
      "Daily",
      "Drifting",
      "Exoctics",
      "French",
      "German",
      "Grand tourers",
      "Hatchbacks",
      "Hypercars",
      "Italian",
      "JDM",
      "Kit cars",
      "Korean",
      "Lowered",
      "Movie cars",
      "Off-road",
      "Oldtimers",
      "Racing",
      "Show and shine",
      "Sportcars",
      "Stock",
      "Supercars",
      "Tuning",
      "Underground",
      "VAG"
    ];
    this.soortenMeetingsFilter = [];

    this._meetingDataService.meetings.subscribe(data => this._meetings = data);
    this.filterDateStart = new Date(new Date().setHours(0,0,0,0));

    this.fillFormArrayWithDBChecked();

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

  fillFormArrayWithDBChecked() {
    this.dbSoortenMeetings.forEach(element => {
      this.soortenMeetingsFilter.push(element);
    });
  }

  isCheckedInDb(value) {
    return this.dbSoortenMeetings.includes(value);
  }

  onCheckChange(event) {
    //gelsecteerde veld
    if(event.target.checked){
      // Toevoegen in array
      this.soortenMeetingsFilter.push(event.target.value);
    }
    // verwijderde item
    else{
      // ittereren tot match
      let i: number = 0;
  
      this.soortenMeetingsFilter.forEach((soort) => {
        if(soort == event.target.value) {
          this.soortenMeetingsFilter.splice(i,1);
          return;
        }
        i++;
      });
    }
    console.log(this.soortenMeetingsFilter)
  }


}
