import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Router} from '@angular/router';
import {Observable} from 'rxjs';
import {FeathersService} from '../../services/feathersService/feathers.service';
import {ChatFacade} from '../../states/facade/chatFacade';
import {User} from '../../interfaces/user';
import {Messages} from '../../interfaces/messages';
import {UsersFacade} from '../../states/facade/usersFacade';
import {fadeInAfter, fadeInOverlay} from '../../animations/fadeIn';

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
export class ChatComponent implements OnInit, AfterViewInit {
  messages: Observable<Messages[]>;
  users: Observable<User[]> ;
  load = false;
  loadOtherElements = false;

  constructor(
    private router: Router,
    private feathersService: FeathersService,
    private chatFacade: ChatFacade,
    private usersFacade: UsersFacade,
  ) {}

    ngOnInit(): void {
      this.setAndConnectMessages();
      this.setAndConnectUsers();
    }

  ngAfterViewInit(): void {
    this.load = true;
  }

  setAndConnectMessages(): void {
    this.feathersService.getMessages().subscribe( obj => {
      this.chatFacade.addMessages(obj.data);
    });
    this.feathersService.getNewMessages(this.addMessage);
    this.messages = this.chatFacade.getAllMessages();
  }

  setAndConnectUsers() {
    this.feathersService.getUsers().subscribe( obj => {
      this.usersFacade.addUsers(obj.data);
    });
    this.feathersService.getNewUsers(this.addUser);
    this.users = this.usersFacade.getAllUsers();
  }

  addMessage = (message: Messages): void => {
    this.chatFacade.addMessage(message);
  }

  addUser = (user: User): void => {
    this.usersFacade.addUser(user);
  }
}
