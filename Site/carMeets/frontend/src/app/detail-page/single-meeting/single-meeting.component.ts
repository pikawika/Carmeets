import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Meeting } from "../../meeting/meeting.model";
import { AuthenticationService } from "../../user/authentication.service";

@Component({
  selector: "app-single-meeting",
  templateUrl: "./single-meeting.component.html",
  styleUrls: ["./single-meeting.component.css"]
})
export class SingleMeetingComponent implements OnInit {
  singleMeeting: Meeting;
  likeAmount: string;
  goingAmount: string;
  hasLiked: boolean;
  isGoing: boolean;
  date1DagLater: Date;

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  

  ngOnInit() {
    this.route.data.subscribe(item => (this.singleMeeting = item["meeting"]));
    this.likeAmount = this.singleMeeting.likeAmount.toString();
    this.date1DagLater = new Date(this.singleMeeting.date);
    this.date1DagLater.setDate(this.date1DagLater.getDate() + 1);
    this.goingAmount = this.singleMeeting.goingAmount.toString();
    let id = this.authenticationService.idFromToken;
    if (id != "-1") {
      this.hasLiked = this.singleMeeting.listUsersLiked.indexOf(id) > -1;
      this.isGoing = this.singleMeeting.listUsersGoing.indexOf(id) > -1;
    }
  }

  showDelete(): boolean {
    return (this.authenticationService.roleFromToken == "admin" || this.singleMeeting.idToevoeger == this.authenticationService.idFromToken);
  }

  onClickLike() {
    if (this.authenticationService.isLoggedIn) {
      this.authenticationService
        .toggleLiked(this.singleMeeting.id)
        .subscribe(val => {
          if (val != null) {
            this.likeAmount = val;
            this.hasLiked = !this.hasLiked;
          }
        });
    } else {
      document.getElementById("modalAanmeldenVereistKnop").click();
    }
  }

  onClickDelete() {
    this.authenticationService
      .deleteMeeting(this.singleMeeting.id)
      .subscribe(val => {
        if (val === true) {
          this.router.navigate(["home"]);
        }
        else {
          alert("failed!");
        }
      });
  }

  onClickGoing() {
    if (this.authenticationService.isLoggedIn) {
      this.authenticationService
        .toggleGoing(this.singleMeeting.id)
        .subscribe(val => {
          if (val != null) {
            this.goingAmount = val;
            this.isGoing = !this.isGoing;
          }
        });
    } else {
      document.getElementById("modalAanmeldenVereistKnop").click();
    }
  }
}
