import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UsersInterfaceComponent} from './users-interface.component';

describe('UsersInterfaceComponent', () => {
  let component: UsersInterfaceComponent;
  let fixture: ComponentFixture<UsersInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersInterfaceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
