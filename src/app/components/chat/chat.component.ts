import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router} from '@angular/router';
import {FeathersService} from '../../services/feathersService/feathers.service';
import {User} from '../../interfaces/user';
import {Messages} from '../../interfaces/messages';

import { Store} from '@ngxs/store';
import {AddMessage, AddMessages} from '../../states/actions/chat.actions';
import {Observable} from 'rxjs';
import {AddUser, AddUsers} from '../../states/actions/user.action';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    private cdr: ChangeDetectorRef
  ) {}

    ngOnInit() {
      this.feathersService.getUsers().subscribe( obj => {
        this.store.dispatch(new AddUsers(obj.data));
      });

      this.feathersService.getMessages().subscribe( obj => {
          this.store.dispatch(new AddMessages(obj.data));
      });

      this.feathersService.getNewMessages(this.addMessage);
      this.feathersService.getNewUsers(this.addUser);

      this.messages = this.store.select(state => state.chat.messages);
      this.users = this.store.select(state => state.user.users);
  }

  addMessage = message => {
    this.store.dispatch(new AddMessage(message));
  }

  addUser = user => {
    this.store.dispatch(new AddUser(user));
  }
}
