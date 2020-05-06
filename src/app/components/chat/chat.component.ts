import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fadeInAnimations } from '../../animations/fade.animation';
import { slideAnimations } from '../../animations/slide.animation';
import { IMessage } from '../../models/interfaces/message.model.i';
import { IUser } from '../../models/interfaces/user.model.i';
import { FeathersService } from '../../services/feathers-service/feathers.service';
import { ChatFacade } from '../../states/facade/chat.facade';
import { UsersFacade } from '../../states/facade/users.facade';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    animations: [
        fadeInAnimations.fadeInAfter,
        fadeInAnimations.fadeInOverlay,
        slideAnimations.slideOut,
        slideAnimations.slideOutDefault,
        slideAnimations.slideIn,
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    host: {
        class: 'app-chat'
    }
})
export class ChatComponent implements OnInit, OnDestroy {
    messages$: Observable<IMessage[]>;
    users$: Observable<IUser[]>;
    load: boolean = false;
    loadOtherElements: boolean = false;
    toggleResponsiveMenu: boolean = false;
    hideHeader: boolean = false;
    private readonly _onDestroy = new Subject();

    constructor(
        private readonly _chatFacade: ChatFacade,
        private readonly _feathersService: FeathersService,
        private readonly _router: Router,
        private readonly _usersFacade: UsersFacade,
        private readonly _breakPointObserver: BreakpointObserver
    ) {
    }

    async ngOnInit() {
        this.load = true;
        this.setScreenSensitiveVariables();
        await this._setAndConnectMessages();
        await this._setAndConnectUsers();
    }

    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }


    async _setAndConnectMessages() {
        const messages = await this._feathersService.getMessages();
        this._chatFacade.setMessages(messages);
        this._feathersService.getNewMessages().pipe(takeUntil(this._onDestroy)).subscribe(message => this._chatFacade.addMessage(message));
        this.messages$ = this._chatFacade.getAllMessages();
    }

    async _setAndConnectUsers() {
        const users = await this._feathersService.getUsers();
        this._usersFacade.addUsers(users);
        this._feathersService.getNewUsers().pipe(takeUntil(this._onDestroy)).subscribe(user => this._usersFacade.addUser(user));
        this.users$ = this._usersFacade.getAllUsers();
    }

    menuButtonClicked() {
        this.toggleResponsiveMenu = !this.toggleResponsiveMenu;
    }

    private setScreenSensitiveVariables() {
        this._breakPointObserver.observe('(min-width: 768px').subscribe(result => {
            this.toggleResponsiveMenu = result.matches;
        });
        this._breakPointObserver.observe('(min-width: 320px)').subscribe(result => {
            this.hideHeader = result.matches;
        });
    }
}
