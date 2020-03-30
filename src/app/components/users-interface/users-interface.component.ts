import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {User} from '../../interfaces/user';
import {FeathersService} from '../../services/feathersService/feathers.service';
import {Router} from '@angular/router';

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
    private feathersService: FeathersService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signOut() {
    this.feathersService.logout().then( () => {
      this.router.navigate(['/']);
    });
  }

}
