import { Component, OnInit, Input } from "@angular/core";
import { Meeting } from "./meeting.model";
import { AuthenticationService } from "../user/authentication.service";

@Component({
  selector: "app-meeting",
  templateUrl: "./meeting.component.html",
  styleUrls: ["./meeting.component.css"]
})
export class MeetingComponent implements OnInit {
  @Input() public meeting: Meeting;
  public get drieCategorien() {
    let drieCategorien = this.meeting.categories.filter(
      (item, index) => index < 3
    );
    if (this.meeting.categories.length > 3) {
      drieCategorien.push("...");
    }
    return drieCategorien;
  }
  likeAmount: string;
  goingAmount: string;
  hasLiked: boolean;
  isGoing: boolean;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.likeAmount = this.meeting.likeAmount.toString();
    this.goingAmount = this.meeting.goingAmount.toString();
    let id = this.authenticationService.idFromToken;
    if (id != "-1"){
      this.hasLiked = (this.meeting.listUsersLiked.indexOf(id) > -1);
      this.isGoing = (this.meeting.listUsersGoing.indexOf(id) > -1);
    }
  }

  onClickLike() {
    this.authenticationService
      .toggleLiked(this.meeting.id)
      .subscribe(val => {
        if (val != null) {
          this.likeAmount = val;
          this.hasLiked = !this.hasLiked;
        }
      });
  }

  onClickGoing() {
    this.authenticationService
      .toggleGoing(this.meeting.id)
      .subscribe(val => {
        if (val != null) {
          this.goingAmount = val;
          this.isGoing = !this.isGoing;
        }
      });
  }
}
