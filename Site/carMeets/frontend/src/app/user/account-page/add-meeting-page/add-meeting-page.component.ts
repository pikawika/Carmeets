import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Meeting } from '../../../meeting/meeting.model';

@Component({
  selector: 'app-add-meeting-page',
  templateUrl: './add-meeting-page.component.html',
  styleUrls: ['./add-meeting-page.component.css']
})
export class AddMeetingPageComponent implements OnInit {
  public newMeetingFormGroup: FormGroup;
  public newMeetingErrorMsg: string;

  constructor(private newMeetingfb: FormBuilder, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.newMeetingFormGroup = this.newMeetingfb.group({
      name: [
        '',
        [Validators.required, Validators.maxLength(25)]
      ],
      date: [
        '',
        [Validators.required, Validators.pattern("^(3[01]|[12][0-9]|0[1-9])/(1[0-2]|0[1-9])/[0-9]{4}$")]
      ],
      gemeente: [
        '',
        [Validators.required]
      ],
      postcode: [
        '',
        [Validators.required]
      ],
      straatnaam: [
        '',
        [Validators.required]
      ],
      straatnr: [
        '',
        [Validators.required]
      ],
      shortDescription: [
        '',
        [Validators.required, Validators.maxLength(80)]
      ],
      fullDescription: [
        '',
        [Validators.required, Validators.maxLength(1500)]
      ],
      categories: [
        '',
        [Validators.required]
      ],
      site: [
        '',
        [Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$")]
      ]
    });
  }

  onSubmitAddMeeting() {
    let dateFrom = this.newMeetingFormGroup.value.date.split("/");
    let date = new Date(dateFrom[2], dateFrom[1] - 1, dateFrom[0])

    this.authenticationService
      .addMeeting(new Meeting(this.newMeetingFormGroup.value.name, date, this.newMeetingFormGroup.value.gemeente, this.newMeetingFormGroup.value.postcode, this.newMeetingFormGroup.value.straatnaam,
        this.newMeetingFormGroup.value.straatnr, this.newMeetingFormGroup.value.shortDescription, this.newMeetingFormGroup.value.fullDescription, this.newMeetingFormGroup.value.categories, this.newMeetingFormGroup.value.site))
      .subscribe(
        val => {
          if (val) {
            this.newMeetingErrorMsg = `Meeting toegevoegd!`;
          }else{
            this.newMeetingErrorMsg = `Fout tijdens toevoegen meeting!`;
          }
        },
        (error: HttpErrorResponse) => {
          this.newMeetingErrorMsg = `Fout tijdens toevoegen meeting!`;
        }
      );
  }

}
