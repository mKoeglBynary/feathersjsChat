import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {IMessage} from '../../models/interfaces/message.model.i';
import {fadeInAnimations} from '../../animations/fade-in.animation';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  animations: [
    fadeInAnimations.fadeIn
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    class: 'app-messages',
  }
})
export class MessagesComponent implements OnInit {
  @Input() messages: IMessage[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
