import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettingsEmailchangeComponent } from './account-settings-emailchange.component';

describe('AccountSettingsEmailchangeComponent', () => {
  let component: AccountSettingsEmailchangeComponent;
  let fixture: ComponentFixture<AccountSettingsEmailchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSettingsEmailchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSettingsEmailchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
