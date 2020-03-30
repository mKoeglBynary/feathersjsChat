import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Messages} from '../../interfaces/messages';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    class: 'app-message'
  }
})
export class MessageComponent implements OnInit {
  @Input() message: Messages;
  constructor() { }

  ngOnInit(): void {
  }

}