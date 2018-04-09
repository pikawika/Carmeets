import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
  name: string;
  date: Date;
  site: string;
  categories: string[];

  constructor() {
    this.name = "Dream Day 2018";
    this.date = new Date(2018, 8, 16);
    this.site = "https://frenchcardrivers.com/";
    this.categories = ["french", "oldtimers", "supercars"];
   }

  ngOnInit() {
  }

}
