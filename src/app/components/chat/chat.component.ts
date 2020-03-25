import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router} from '@angular/router';
import {FeathersService} from '../../services/feathersService/feathers.service';
import {User} from '../../interfaces/user';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


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
  messages = [];
  users = [] ;

  constructor(
    private router: Router,
    private feathersService: FeathersService
  ) {}

    ngOnInit() {
      this.feathersService.login().then(success => {
        if (!success) {
          this.router.navigate(['/']);
        }
      });

      this.feathersService.getUsers().subscribe( obj => {
        this.users = obj.data;
      });
      this.feathersService.getMessages().subscribe( obj => {
        this.messages = obj.data;
      });

      this.feathersService.getNewMessages(this.addMessage);
      this.feathersService.getNewUsers(this.addUser);
  }

  addMessage = message => {
    this.messages.unshift(message);
  }

  addUser = user => {
    this.users.push(user);
  }

  signOut() {
    this.feathersService.logout().then( () => {
      this.router.navigate(['/']);
    });
  }

  sendMessage(input) {
    this.feathersService.sendMessage(input);
  }

}
