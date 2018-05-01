import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-preferences',
  templateUrl: './account-preferences.component.html',
  styleUrls: ['./account-preferences.component.css']
})
export class AccountPreferencesComponent implements OnInit {
  public soortenMeetings: string[];
  public dbSoortenMeetings: string[];
  public categoryErrorMsg: string;
  public changePreferencesFormGroup: FormGroup;

  constructor(private changePreferencesfb: FormBuilder, private authenticationService: AuthenticationService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(item=>this.dbSoortenMeetings = item['dbSoortenMeetings']);
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

    this.changePreferencesFormGroup = this.changePreferencesfb.group({
      soortenMeetings: new FormArray([], Validators.required),
    });

    this.fillFormArrayWithDBChecked();

  }

  onCheckChange(event) {
    const formArray: FormArray = this.changePreferencesFormGroup.get('soortenMeetings') as FormArray;
  
    //gelsecteerde veld
    if(event.target.checked){
      // Toevoegen in array
      this.categoryErrorMsg = "";
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
            this.categoryErrorMsg = "U moet minstens 1 categorie kiezen.";
          }
          return;
        }
        i++;
      });
    }
  }

  fillFormArrayWithDBChecked() {
    const formArray: FormArray = this.changePreferencesFormGroup.get('soortenMeetings') as FormArray;
    
    this.dbSoortenMeetings.forEach(element => {
      formArray.push(new FormControl(element));
    });
  }

  isCheckedInDb(value) {
    return this.dbSoortenMeetings.includes(value);
  }

  onSubmitChangePreferences() {
    this.authenticationService
      .changePreferences(this.changePreferencesFormGroup.value.soortenMeetings)
      .subscribe(
        val => {
          if (val != true) {
            this.categoryErrorMsg = `Fout tijdens wijzigen van uw voorkeuren!`;
          } else {
            this.categoryErrorMsg = `Voorkeuren gewijzigd!`;
          }
        },
        (error: HttpErrorResponse) => {
          this.categoryErrorMsg = `Fout tijdens wijzigen van uw voorkeuren!`;
        }
      );
  }

}
