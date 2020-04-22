import {
  ChangeDetectionStrategy,
  Component, OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {FeathersService} from '../../services/feathers-service/feathers.service';
import {ChatFacade} from '../../states/facade/chat.facade';
import {IUser} from '../../models/interfaces/user.model.i';
import {IMessage} from '../../models/interfaces/message.model.i';
import {UsersFacade} from '../../states/facade/users.facade';
import {fadeInAfter, fadeInOverlay} from '../../animations/fade-in.animation';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  animations: [
    fadeInOverlay, fadeInAfter
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-chat'
  }
})
export class ChatComponent implements OnInit, OnDestroy {
  private readonly _onDestroy = new Subject();
  messages: Observable<IMessage[]>;
  users: Observable<IUser[]>;
  load = false;
  loadOtherElements = 'hidden';

  constructor(
    private readonly _router: Router,
    private readonly _feathersService: FeathersService,
    private readonly _chatFacade: ChatFacade,
    private readonly _usersFacade: UsersFacade,
  ) {
  }

  async ngOnInit() {
    this.load = true;
    await this._setAndConnectMessages();
    await this._setAndConnectUsers();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }


  async _setAndConnectMessages() {
    const messages = await this._feathersService.getMessages();
    this._chatFacade.addMessages(messages);
    this._feathersService.getNewMessages().pipe(takeUntil(this._onDestroy)).subscribe(message => this._chatFacade.addMessage(message));
    this.messages = this._chatFacade.getAllMessages();
  }

  async _setAndConnectUsers() {
    const users = await this._feathersService.getUsers();
    this._usersFacade.addUsers(users);
    this._feathersService.getNewUsers().pipe(takeUntil(this._onDestroy)).subscribe(user => this._usersFacade.addUser(user));
    this.users = this._usersFacade.getAllUsers();
  }
}
