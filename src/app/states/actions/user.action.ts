import { User} from '../../interfaces/user';

export class AddUser {
  static readonly type = '[User] add';

  constructor(public payload: User) {
  }
}

export class AddUsers {
  static readonly  type = '[Users] add';

  constructor(public payload: User[]) {
  }
}
