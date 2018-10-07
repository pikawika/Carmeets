import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettingsPasschangeComponent } from './account-settings-passchange.component';

describe('AccountSettingsPasschangeComponent', () => {
  let component: AccountSettingsPasschangeComponent;
  let fixture: ComponentFixture<AccountSettingsPasschangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSettingsPasschangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSettingsPasschangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
