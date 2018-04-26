import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Meeting } from '../../meeting/meeting.model';

@Component({
  selector: 'app-add-meeting-page',
  templateUrl: './add-meeting-page.component.html',
  styleUrls: ['./add-meeting-page.component.css']
})
export class AddMeetingPageComponent implements OnInit {
  @Output() newMeeting = new EventEmitter<Meeting>();

  constructor() { }

  ngOnInit() {
  }

  addMeeting(meetingName: HTMLInputElement): boolean {
    this.newMeeting.emit(new Meeting(meetingName.value, new Date(2018, 8, 16), "Wetteren", "Meeting door French Car Driver en Dare2Dream", "Mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id lorem euismod placerat. Vivamus porttitor magna enim, ac accumsan tortor cursus at. Phasellus sed ultricies mi non congue ullam corper. Praesent tincidunt sed tellus ut rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida diam non fringilla.", ["french", "oldtimers", "supercars"], "https://frenchcardrivers.com/"));
    return false;
  }

}