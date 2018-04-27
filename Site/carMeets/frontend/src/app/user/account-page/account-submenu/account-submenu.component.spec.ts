import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSubmenuComponent } from './account-submenu.component';

describe('AccountSubmenuComponent', () => {
  let component: AccountSubmenuComponent;
  let fixture: ComponentFixture<AccountSubmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSubmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
