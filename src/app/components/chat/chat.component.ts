import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from '../../interfaces/user';

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
  users: User[] = [
    { _id: '23423424', img: 'https://picsum.photos/200/300', email: 'realme@me.de' },
    { _id: '98983424', img: 'https://picsum.photos/200/500', email: 'notMe@me.de' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  signOut() {
    console.log('Sign Out...');
  }

  sendMessage() {
    console.log('Send Message...')
  }

}
