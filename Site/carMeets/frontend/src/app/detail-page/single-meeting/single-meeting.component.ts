import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meeting } from '../../meeting/meeting.model';
import { AuthenticationService } from '../../user/authentication.service';

@Component({
  selector: 'app-single-meeting',
  templateUrl: './single-meeting.component.html',
  styleUrls: ['./single-meeting.component.css']
})
export class SingleMeetingComponent implements OnInit {
  singleMeeting: Meeting;
  likeAmount: string;
  goingAmount: string;
  constructor(private route: ActivatedRoute, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.route.data.subscribe(item=>this.singleMeeting = item['meeting']);
    this.likeAmount = this.singleMeeting.likeAmount.toString();
    this.goingAmount = this.singleMeeting.goingAmount.toString();
  }


  onClickLike() {
    this.authenticationService.toggleLiked(this.singleMeeting.id)
    .subscribe(
      val => {
        if (val != null) {
          this.likeAmount = val;
        }
      }
    );
  }

  onClickGoing() {
    this.authenticationService.toggleGoing(this.singleMeeting.id)
    .subscribe(
      val => {
        if (val != null) {
          this.goingAmount = val;
        }
      }
    );
  }

}