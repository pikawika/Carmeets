import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meeting } from '../../../meeting/meeting.model';

@Component({
  selector: 'app-liked-meetings',
  templateUrl: './liked-meetings.component.html',
  styleUrls: ['./liked-meetings.component.css']
})
export class LikedMeetingsComponent implements OnInit {
  public likedMeetings: Meeting[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(item=>this.likedMeetings = item['likedMeetings']);
  }

}
