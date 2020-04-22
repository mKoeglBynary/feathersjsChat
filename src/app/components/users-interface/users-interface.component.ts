import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthFacade} from '../../states/facade/auth.facade';
import {buttonClickedAnimation} from '../../animations/button-click.animation';
import {IUser} from '../../models/interfaces/user.model.i';

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
