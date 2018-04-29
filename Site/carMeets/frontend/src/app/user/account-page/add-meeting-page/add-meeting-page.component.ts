import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder, FormArray, FormControl, ValidatorFn, AbstractControl } from "@angular/forms";
import { AuthenticationService } from "../../authentication.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Meeting } from "../../../meeting/meeting.model";

@Component({
  selector: "app-add-meeting-page",
  templateUrl: "./add-meeting-page.component.html",
  styleUrls: ["./add-meeting-page.component.css"]
})
export class AddMeetingPageComponent implements OnInit {
  public newMeetingFormGroup: FormGroup;
  public newMeetingErrorMsg: string;
  public categoryeErrorMsg: string;
  public soortenMeetings: string[];

  constructor(
    private newMeetingfb: FormBuilder,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.soortenMeetings = [
      "American Muscle",
      "Audio",
      "British",
      "Cabrio",
      "Car limbo",
      "Classics",
      "Daily",
      "Drifting",
      "Exoctics",
      "French",
      "German",
      "Grand tourers",
      "Hatchbacks",
      "Hypercars",
      "Italian",
      "JDM",
      "Kit cars",
      "Korean",
      "Lowered",
      "Movie cars",
      "Off-road",
      "Oldtimers",
      "Racing",
      "Show and shine",
      "Sportcars",
      "Stock",
      "Supercars",
      "Tuning",
      "Underground",
      "VAG"
    ];

    this.newMeetingFormGroup = this.newMeetingfb.group({
      name: ["", [Validators.required, Validators.maxLength(25)]],
      date: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^(3[01]|[12][0-9]|0[1-9])/(1[0-2]|0[1-9])/[0-9]{4}$"
          )
        ]
      ],
      gemeente: ["", [Validators.required]],
      postcode: ["", [Validators.required]],
      straatnaam: ["", [Validators.required]],
      straatnr: ["", [Validators.required]],
      shortDescription: ["", [Validators.required, Validators.maxLength(80)]],
      fullDescription: ["", [Validators.required, Validators.maxLength(1500)]],
      categories: new FormArray([], Validators.required),
      site: [
        "",
        [
          Validators.pattern(
            "^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$"
          )
        ]
      ]
    });
  }

  onCheckChange(event) {
    const formArray: FormArray = this.newMeetingFormGroup.get('categories') as FormArray;
  
    //gelsecteerde veld
    if(event.target.checked){
      // Toevoegen in array
      this.categoryeErrorMsg = "";
      formArray.push(new FormControl(event.target.value));
    }
    // verwijderde item
    else{
      // ittereren tot match
      let i: number = 0;
  
      formArray.controls.forEach((ctrl: FormControl) => {
        if(ctrl.value == event.target.value) {
          formArray.removeAt(i);
          if (formArray.length == 0){
            this.categoryeErrorMsg = "U moet minstens 1 categorie kiezen.";
          }
          
          return;
        }
  
        i++;
      });
    }
  }

  onSubmitAddMeeting() {
    let dateFrom = this.newMeetingFormGroup.value.date.split("/");
    let date = new Date(dateFrom[2], dateFrom[1] - 1, dateFrom[0]);

    this.authenticationService
      .addMeeting(
        new Meeting(
          this.newMeetingFormGroup.value.name,
          date,
          this.newMeetingFormGroup.value.gemeente,
          this.newMeetingFormGroup.value.postcode,
          this.newMeetingFormGroup.value.straatnaam,
          this.newMeetingFormGroup.value.straatnr,
          this.newMeetingFormGroup.value.shortDescription,
          this.newMeetingFormGroup.value.fullDescription,
          this.newMeetingFormGroup.value.categories,
          this.newMeetingFormGroup.value.site
        )
      )
      .subscribe(
        val => {
          if (val) {
            this.newMeetingErrorMsg = `Meeting toegevoegd!`;
          } else {
            this.newMeetingErrorMsg = `Fout tijdens toevoegen meeting!`;
          }
        },
        (error: HttpErrorResponse) => {
          this.newMeetingErrorMsg = `Fout tijdens toevoegen meeting!`;
        }
      );
  }
}
