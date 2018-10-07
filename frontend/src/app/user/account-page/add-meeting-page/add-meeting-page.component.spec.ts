import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeetingPageComponent } from './add-meeting-page.component';

describe('AddMeetingPageComponent', () => {
  let component: AddMeetingPageComponent;
  let fixture: ComponentFixture<AddMeetingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMeetingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMeetingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
