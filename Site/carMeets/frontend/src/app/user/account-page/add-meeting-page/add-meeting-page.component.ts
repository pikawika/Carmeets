import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-meeting-page',
  templateUrl: './add-meeting-page.component.html',
  styleUrls: ['./add-meeting-page.component.css']
})
export class AddMeetingPageComponent implements OnInit {
  public newMeetingFormGroup: FormGroup;
  public newMeetingErrorMsg: string;

  constructor(private newMeetingfb: FormBuilder) { }

  ngOnInit() {
    this.newMeetingFormGroup = this.newMeetingfb.group({
      name: [
        '',
        [Validators.required]
      ],
      date: [
        '',
        [Validators.required, Validators.]
      ],
      gemeente: [
        '',
        [Validators.required, Validators.minLength(4)],
        this.serverSideValidateUsername()
      ],
      shortDescription: [
        '',
        [Validators.required, Validators.minLength(4)],
        this.serverSideValidateUsername()
      ],
      fullDescription: [
        '',
        [Validators.required, Validators.minLength(4)],
        this.serverSideValidateUsername()
      ],
      categories: [
        '',
        [Validators.required, Validators.minLength(4)],
        this.serverSideValidateUsername()
      ],
      site: [
        '',
        [Validators.required, Validators.minLength(4)],
        this.serverSideValidateUsername()
      ],
      
    });
  }

}
