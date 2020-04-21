import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {IUser} from '../../models/interfaces/user.model.i';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    class: 'app-active-users'
  }
})
export class ActiveUsersComponent implements OnInit {
  @Input() users: IUser[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
