import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {IMessages} from '../../interfaces/messages';
import {fadeInEnter} from '../../animations/fadeIn';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  animations: [
    fadeInEnter
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    class: 'app-messages',
  }
})
export class MessagesComponent implements OnInit {
  @Input() messages: IMessages[];
  constructor() { }

  ngOnInit(): void {
  }

}
