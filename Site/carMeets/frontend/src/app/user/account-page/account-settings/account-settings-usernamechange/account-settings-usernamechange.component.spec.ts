import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettingsUsernamechangeComponent } from './account-settings-usernamechange.component';

describe('AccountSettingsUsernamechangeComponent', () => {
  let component: AccountSettingsUsernamechangeComponent;
  let fixture: ComponentFixture<AccountSettingsUsernamechangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSettingsUsernamechangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSettingsUsernamechangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
