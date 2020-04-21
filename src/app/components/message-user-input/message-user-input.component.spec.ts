import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MessageUserInputComponent} from './message-user-input.component';

describe('MessageUserInputComponent', () => {
  let component: MessageUserInputComponent;
  let fixture: ComponentFixture<MessageUserInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageUserInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageUserInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
