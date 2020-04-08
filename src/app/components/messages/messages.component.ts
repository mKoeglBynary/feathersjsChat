import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Messages} from '../../interfaces/messages';
import {newMessage} from '../../animations/newMessage';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  animations: [
    newMessage
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    '[@fadeIn]': '\'in\'',
    '(@fadeIn.start)': 'toggle()',
    '(@fadeIn.done)': 'toggle()',
    class: 'app-messages',
  }
})
export class MessagesComponent implements OnInit {
  @Input() messages: Messages[];
  move = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.move = !this.move;
    console.log('toggelin...')
  }

}
