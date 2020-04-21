import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ActiveUsersHeaderComponent} from './active-users-header.component';

describe('ActiveUsersHeaderComponent', () => {
  let component: ActiveUsersHeaderComponent;
  let fixture: ComponentFixture<ActiveUsersHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveUsersHeaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveUsersHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
