import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoingMeetingsComponent } from './going-meetings.component';

describe('GoingMeetingsComponent', () => {
  let component: GoingMeetingsComponent;
  let fixture: ComponentFixture<GoingMeetingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoingMeetingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoingMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
