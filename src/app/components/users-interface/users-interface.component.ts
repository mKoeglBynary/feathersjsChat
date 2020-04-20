import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {IUser} from '../../interfaces/user';
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
  @Input() users: IUser[];

  constructor(
    private readonly _authFacade: AuthFacade,
  ) { }

  ngOnInit(): void {
  }

  signOut(): void {
    this._authFacade.logout();
  }

}
