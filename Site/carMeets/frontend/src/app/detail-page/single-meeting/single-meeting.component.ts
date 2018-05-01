import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meeting } from '../../meeting/meeting.model';

@Component({
  selector: 'app-single-meeting',
  templateUrl: './single-meeting.component.html',
  styleUrls: ['./single-meeting.component.css']
})
export class SingleMeetingComponent implements OnInit {
  singleMeeting: Meeting;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(item=>this.singleMeeting = item['meeting']);
  }

}