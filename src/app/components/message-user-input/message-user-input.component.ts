import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { buttonClickedAnimation } from '../../animations/button-click.animation';
import { FeathersService } from '../../services/feathers-service/feathers.service';

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
    sendButtonClicked: boolean = false;

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
