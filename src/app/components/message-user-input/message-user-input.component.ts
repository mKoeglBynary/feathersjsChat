import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-message-user-input',
  templateUrl: './message-user-input.component.html',
  styleUrls: ['./message-user-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    class: 'app-message-user-input'
  }
})
export class MessageUserInputComponent implements OnInit {
  @Output handleSendMessage: EventEmitter = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  emitSendMessage(input) {
    this.handleSendMessage.emit(input);
  }

}
