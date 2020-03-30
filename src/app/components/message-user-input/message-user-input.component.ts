import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FeathersService} from '../../services/feathersService/feathers.service';

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
  userInput: string;
  constructor(
    private feathersService: FeathersService,
  ) { }

  ngOnInit(): void {
  }

  async sendMessage() {
    await this.feathersService.sendMessage(this.userInput)
    this.userInput = '';
  }

}
