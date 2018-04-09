import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-meeting",
  templateUrl: "./meeting.component.html",
  styleUrls: ["./meeting.component.css"]
})
export class MeetingComponent implements OnInit {
  name: string;
  date: Date;
  site: string;
  gemeente: string;
  shortdescription: string;
  fulldescription: string;
  categories: string[];
  likeAmount: number;
  commentAmount: number;


  constructor() {
    this.name = "Dream Day 2018";
    this.date = new Date(2018, 8, 16);
    this.site = "https://frenchcardrivers.com/";
    this.categories = ["french", "oldtimers", "supercars"];
    this.shortdescription = "Meeting door French Car Driver en Dare2Dream";
    this.fulldescription =
      "Mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id lorem euismod placerat. Vivamus porttitor magna enim, ac accumsan tortor cursus at. Phasellus sed ultricies mi non congue ullam corper. Praesent     tincidunt sed tellus ut rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida diam non     fringilla.";
    this.gemeente = "Wetteren";
    this.likeAmount = 36;
    this.commentAmount = 48;
  }

  ngOnInit() {}
}
