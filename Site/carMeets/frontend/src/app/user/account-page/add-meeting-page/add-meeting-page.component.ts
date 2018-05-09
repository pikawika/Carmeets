import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
  FormControl,
  ValidatorFn,
  AbstractControl
} from "@angular/forms";
import { AuthenticationService } from "../../authentication.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Meeting } from "../../../meeting/meeting.model";
import { Router } from "@angular/router";
declare var require: any;
let fs = require("fs");

@Component({
  selector: "app-add-meeting-page",
  templateUrl: "./add-meeting-page.component.html",
  styleUrls: ["./add-meeting-page.component.css"]
})
export class AddMeetingPageComponent implements OnInit {
  public newMeetingFormGroup: FormGroup;
  public newMeetingErrorMsg: string;
  public categoryErrorMsg: string;
  public afbeeldingErrorMsg: string;
  public afbeeldingConfirmMsg: string;
  public soortenMeetings: string[];
  filesToUpload: Array<File> = [];

  constructor(
    private newMeetingfb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
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
      afbeeldingnaam: ["", [Validators.required]],
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
    const formArray: FormArray = this.newMeetingFormGroup.get(
      "categories"
    ) as FormArray;

    //gelsecteerde veld
    if (event.target.checked) {
      // Toevoegen in array
      this.categoryErrorMsg = "";
      formArray.push(new FormControl(event.target.value));
    }
    // verwijderde item
    else {
      // ittereren tot match
      let i: number = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {
          formArray.removeAt(i);
          if (formArray.length == 0) {
            this.categoryErrorMsg = "U moet minstens 1 categorie kiezen.";
          }

          return;
        }

        i++;
      });
    }
  }

  onImgUploadChange(event) {
    let geuploadBestand = event.target.files;

    if (geuploadBestand.length != 1) {
      this.afbeeldingErrorMsg = "U moet één foto kiezen voor uw meeting";
      this.newMeetingFormGroup.patchValue({
        afbeeldingnaam: null
      });
      this.afbeeldingConfirmMsg = "";
    } else {
      let filename = geuploadBestand[0].name;
      this.newMeetingFormGroup.patchValue({
        afbeeldingnaam: filename
      });
      this.afbeeldingConfirmMsg = "U heeft een foto geselecteerd: " + filename;
      this.afbeeldingErrorMsg = "";

      this.filesToUpload = <Array<File>>event.target.files;
    }
  }

  onSubmitAddMeeting() {
    let dateFrom = this.newMeetingFormGroup.value.date.split("/");
    let date = new Date(dateFrom[2], dateFrom[1] - 1, dateFrom[0]);

    const data: any = new FormData();
    const files: Array<File> = this.filesToUpload;

    //slechts 1 afbeelding
    data.append("afbeelding", files[0], files[0]["name"]);

    this.authenticationService.uploadMeetingImg(data).subscribe(
      filename => {
        if (filename == null) {
          this.newMeetingErrorMsg = `Fout tijdens uploaden afbeelding`;
        } else {
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
                filename,
                this.newMeetingFormGroup.value.site
              )
            )
            .subscribe(
              val => {
                if (val != null) {
                  this.router.navigate(["meet-detail/" + val]);
                } else {
                  this.newMeetingErrorMsg = `Fout tijdens toevoegen meeting!`;
                }
              },
              (error: HttpErrorResponse) => {
                this.newMeetingErrorMsg = `Fout tijdens toevoegen meeting!`;
              }
            );
        }
      },
      (error: HttpErrorResponse) => {
        this.newMeetingErrorMsg = `Fout tijdens uploaden afbeelding!`;
      }
    );
  }
}
