import { Component, OnInit } from '@angular/core';
import { Meeting } from '../meeting/meeting.model';
import { ActivatedRoute } from '@angular/router';
import { MeetingDataService } from '../meeting-data.service';

@Component({
  selector: 'app-single-meeting',
  templateUrl: './single-meeting.component.html',
  styleUrls: ['./single-meeting.component.css']
})
export class SingleMeetingComponent implements OnInit {
  singleMeeting: Meeting;
  constructor(private route: ActivatedRoute,
    private meetingDataService: MeetingDataService) { }

  ngOnInit() {
    this.route.data.subscribe(item=>this.singleMeeting = item['meeting']);
  }

}