import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Messages} from '../../interfaces/messages';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    class: 'app-messages',
  }
})
export class MessagesComponent implements OnInit {
  @Input() messages: Messages[];

  constructor() { }

  ngOnInit(): void {
  }

}
