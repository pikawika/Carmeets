import { Component, OnInit, Input } from "@angular/core";
import { Meeting } from "./meeting.model";

@Component({
  selector: "app-meeting",
  templateUrl: "./meeting.component.html",
  styleUrls: ["./meeting.component.css"]
})
export class MeetingComponent implements OnInit {
  @Input() public meeting:Meeting;
  public get drieCategorien() {
    let drieCategorien = this.meeting.categories.filter((item, index) => index < 3 );
    if (this.meeting.categories.length > 3){
      drieCategorien.push("...");
    }
    return drieCategorien;
 }

  constructor() {
    
  }

  ngOnInit() {}
}
