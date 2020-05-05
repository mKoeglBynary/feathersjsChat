import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { fadeInAnimations } from '../../animations/fade.animation';
import { IMessage } from '../../models/interfaces/message.model.i';

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
