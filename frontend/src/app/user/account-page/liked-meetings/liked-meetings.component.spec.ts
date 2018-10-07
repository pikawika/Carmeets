import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedMeetingsComponent } from './liked-meetings.component';

describe('LikedMeetingsComponent', () => {
  let component: LikedMeetingsComponent;
  let fixture: ComponentFixture<LikedMeetingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikedMeetingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
