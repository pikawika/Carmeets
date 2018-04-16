import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeetingDataService } from '../meeting-data.service';
import { Meeting } from '../meeting/meeting.model';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {
  private _meeting: Meeting;

  constructor(private route: ActivatedRoute, 
    private meetingDataService: MeetingDataService) {
  }

  ngOnInit() { 
    this.route.data.subscribe(item => 
      this._meeting = item['meeting']);
  }

}
