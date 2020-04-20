import {
  ChangeDetectionStrategy,
  Component, OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {FeathersService} from '../../services/feathersService/feathers.service';
import {ChatFacade} from '../../states/facade/chatFacade';
import {IUser} from '../../interfaces/user';
import {IMessages} from '../../interfaces/messages';
import {UsersFacade} from '../../states/facade/usersFacade';
import {fadeInAfter, fadeInOverlay} from '../../animations/fadeIn';
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
  messages: Observable<IMessages[]>;
  users: Observable<IUser[]> ;
  load = false;
  loadOtherElements = 'hidden';

  constructor(
    private readonly _router: Router,
    private readonly _feathersService: FeathersService,
    private readonly _chatFacade: ChatFacade,
    private readonly _usersFacade: UsersFacade,
) {}

  ngOnInit(): void {
      this._setAndConnectMessages();
      this._setAndConnectUsers();
      this.load = true;
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }


  _setAndConnectMessages(): void {
    this._feathersService.getMessages()
      .pipe(takeUntil(this._onDestroy))
      .subscribe( obj => {
      this._chatFacade.addMessages(obj.data);
    });
    this._feathersService.getNewMessages(this.addMessage);
    this.messages = this._chatFacade.getAllMessages();
  }

  _setAndConnectUsers() {
    this._feathersService.getUsers()
      .pipe(takeUntil(this._onDestroy))
      .subscribe( obj => {
      this._usersFacade.addUsers(obj.data);
    });
    this._feathersService.getNewUsers(this.addUser);
    this.users = this._usersFacade.getAllUsers();
  }

  addMessage = (message: IMessages): void => {
    this._chatFacade.addMessage(message);
  }

  addUser = (user: IUser): void => {
    this._usersFacade.addUser(user);
  }
}
