import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-active-users-header',
  templateUrl: './active-users-header.component.html',
  styleUrls: ['./active-users-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    class: 'app-active-users-header'
  }
})
export class ActiveUsersHeaderComponent implements OnInit {
  @Input() usersLength: number;

  constructor() {
  }

  ngOnInit(): void {
  }

}
