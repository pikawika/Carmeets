import { Component, OnInit } from '@angular/core';
import { Meeting } from '../../../meeting/meeting.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-going-meetings',
  templateUrl: './going-meetings.component.html',
  styleUrls: ['./going-meetings.component.css']
})
export class GoingMeetingsComponent implements OnInit {
  public goingMeetings: Meeting[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(item=>this.goingMeetings = item['goingMeetings']);
  }

}
