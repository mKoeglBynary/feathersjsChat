import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {IUser} from '../../models/interfaces/user.model.i';
import {AuthFacade} from '../../states/facade/authFacade';
import {buttonClickedAnimation} from '../../animations/button-click.animation';

@Component({
  selector: 'app-users-interface',
  templateUrl: './users-interface.component.html',
  styleUrls: ['./users-interface.component.scss'],
  animations: [
    buttonClickedAnimation
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    class: 'app-users-interface'
  }
})
export class UsersInterfaceComponent implements OnInit {
  @Input() users: IUser[];
  signOutClicked = false;

  constructor(
    private readonly _authFacade: AuthFacade,
  ) {
  }

  ngOnInit(): void {
  }

  signOut(): void {
    this._authFacade.logout();
  }

}
