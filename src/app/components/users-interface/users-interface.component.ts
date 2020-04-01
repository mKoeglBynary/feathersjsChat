import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {User} from '../../interfaces/user';
import {Router} from '@angular/router';
import {AuthFacade} from '../../states/facade/authFacade';

@Component({
  selector: 'app-users-interface',
  templateUrl: './users-interface.component.html',
  styleUrls: ['./users-interface.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    class: 'app-users-interface'
  }
})
export class UsersInterfaceComponent implements OnInit {
  @Input() users: User[];
  @Output() handleSignOut: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private authFacade: AuthFacade,
  ) { }

  ngOnInit(): void {
  }

  signOut() {
    this.authFacade.logout();
  }

}
