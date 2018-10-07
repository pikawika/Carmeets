import { Component, OnInit, Input, HostListener, ElementRef } from "@angular/core";
import { Meeting } from "./meeting.model";
import { AuthenticationService } from "../user/authentication.service";
import { trigger,state,style,transition,animate,keyframes, query, stagger, group } from '@angular/animations';

@Component({
  selector: "app-meeting",
  templateUrl: "./meeting.component.html",
  styleUrls: ["./meeting.component.css"],
  animations: [
    trigger('scrollAnimation', [
      state('show', style({
        opacity: 1,
        transform: "translateY(0)"
      })),
      state('hide', style({
        opacity: 0,
        transform: "translateY(+100%)"
      })),
      transition('show => hide', animate('700ms ease-out')),
      transition('hide => show', animate('700ms ease-in'))
    ])
  ]
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
  state = 'hide';

  constructor(private authenticationService: AuthenticationService, public el: ElementRef) {}

  @HostListener('window:scroll', ['$event'])
    checkScroll() {
      const componentPosition = this.el.nativeElement.offsetTop
      const scrollPosition = window.pageYOffset + (document.documentElement.clientHeight *0.6);

      if (scrollPosition >= componentPosition) {
        this.state = 'show'
      } else {
        this.state = 'hide'
      }

    }

  ngOnInit() {
    this.checkScroll();
    this.likeAmount = this.meeting.likeAmount.toString();
    this.goingAmount = this.meeting.goingAmount.toString();
    let id = this.authenticationService.idFromToken;
    if (id != "-1") {
      this.hasLiked = this.meeting.listUsersLiked.indexOf(id) > -1;
      this.isGoing = this.meeting.listUsersGoing.indexOf(id) > -1;
    }
  }

  onClickLike() {
    if (this.authenticationService.isLoggedIn) {
      this.authenticationService.toggleLiked(this.meeting.id).subscribe(val => {
        if (val != null) {
          this.likeAmount = val;
          this.hasLiked = !this.hasLiked;
        }
      });
    } else {
      document.getElementById("modalAanmeldenVereistKnop").click();
    }
  }

  onClickGoing() {
    if (this.authenticationService.isLoggedIn) {
      this.authenticationService.toggleGoing(this.meeting.id).subscribe(val => {
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
