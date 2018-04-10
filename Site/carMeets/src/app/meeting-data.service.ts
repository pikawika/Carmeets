import { Injectable } from '@angular/core';
import { Meeting } from './meeting/meeting.model';

@Injectable()
export class MeetingDataService {
  private _meetings = new Array<Meeting>();

  constructor() {
    const meeting1 = new Meeting("Dream Day 2018", new Date(2018, 8, 16), "Wetteren", "Meeting door French Car Driver en Dare2Dream", "Mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id lorem euismod placerat. Vivamus porttitor magna enim, ac accumsan tortor cursus at. Phasellus sed ultricies mi non congue ullam corper. Praesent tincidunt sed tellus ut rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida diam non fringilla.", ["french", "oldtimers", "supercars"], "https://frenchcardrivers.com/"); 
    const meeting2 = new Meeting("2 Dream Day 2018", new Date(2020, 8, 16), "2Wetteren", "2Meeting door French Car Driver en Dare2Dream", "2Mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id lorem euismod placerat. Vivamus porttitor magna enim, ac accumsan tortor cursus at. Phasellus sed ultricies mi non congue ullam corper. Praesent tincidunt sed tellus ut rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida diam non fringilla.", ["2french", "2oldtimers", "2supercars"], "https://2frenchcardrivers.com/"); 
	
    this._meetings.push(meeting1);
    this._meetings.push(meeting2);
	
  }

  get meetings() {
    return this._meetings;
  }

  addMeeting(meeting: Meeting) {
    this._meetings = [...this._meetings, meeting];
  }

}
