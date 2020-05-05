import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { buttonClickedAnimation } from '../../animations/button-click.animation';
import { IUser } from '../../models/interfaces/user.model.i';
import { AuthFacade } from '../../states/facade/auth.facade';

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
    signOutClicked: boolean = false;

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
