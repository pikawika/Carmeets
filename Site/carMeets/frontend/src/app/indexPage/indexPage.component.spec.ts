import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPageComponent } from './indexPage.component';

describe('IndexComponent', () => {
  let component: IndexPageComponent;
  let fixture: ComponentFixture<IndexPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
