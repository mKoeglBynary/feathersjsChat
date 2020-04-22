import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {coerceNumberProperty} from '@angular/cdk/coercion';

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
  private _usersLength: number;

  @Input()
  set usersLength(value: number) {
    this._usersLength = coerceNumberProperty(value);
  }

  get usersLength(): number {
    return this._usersLength;
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
