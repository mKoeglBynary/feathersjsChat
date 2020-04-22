import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FeathersService} from '../../services/feathers-service/feathers.service';
import {buttonClickedAnimation} from '../../animations/button-click.animation';

@Component({
  selector: 'app-message-user-input',
  templateUrl: './message-user-input.component.html',
  styleUrls: ['./message-user-input.component.scss'],
  animations: [
    buttonClickedAnimation
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    class: 'app-message-user-input'
  }
})
export class MessageUserInputComponent implements OnInit {
  userInput: string;
  sendClicked = false;

  constructor(
    private readonly _feathersService: FeathersService,
  ) {
  }

  ngOnInit(): void {
  }

  async sendMessage(): Promise<void> {
    const value: string = this.userInput;
    this.userInput = '';

    if (!value || value.length === 0) {
      return;
    }

    await this._feathersService.sendMessage(value);
  }

}
