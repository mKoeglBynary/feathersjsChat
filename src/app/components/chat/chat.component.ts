import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router} from '@angular/router';
import { Store} from '@ngxs/store';
import {Observable} from 'rxjs';

import {User} from '../../interfaces/user';
import {Messages} from '../../interfaces/messages';
import {FeathersService} from '../../services/feathersService/feathers.service';
import {AddMessage, AddMessages} from '../../states/actions/chat.actions';
import {AddUser, AddUsers} from '../../states/actions/user.action';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    class: 'app-chat'
  }
})
export class ChatComponent implements OnInit {
  messages: Observable<Messages[]>;
  users: Observable<User[]> ;

  constructor(
    private router: Router,
    private feathersService: FeathersService,
    private store: Store,
  ) {}

    ngOnInit() {
      this.setAndConnectMessages();
      this.setAndConnectUsers();
  }

  setAndConnectMessages() {
    this.feathersService.getMessages().subscribe( obj => {
      this.store.dispatch(new AddMessages(obj.data));
    });
    this.feathersService.getNewMessages(this.addMessage);
    this.messages = this.store.select(state => state.chat.messages);
  }

  setAndConnectUsers() {
    this.feathersService.getUsers().subscribe( obj => {
      this.store.dispatch(new AddUsers(obj.data));
    });
    this.feathersService.getNewUsers(this.addUser);
    this.users = this.store.select(state => state.user.users);
  }

  addMessage = message => {
    console.log("only one time..");
    this.store.dispatch(new AddMessage(message));
  }

  addUser = user => {
    this.store.dispatch(new AddUser(user));
  }
}
