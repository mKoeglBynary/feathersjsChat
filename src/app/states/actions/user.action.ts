import { User} from '../../interfaces/user';

export class AddUser {
  static readonly type = '[User] Add';

  constructor(public payload: User) {
  }
}

export class AddUsers {
  static readonly  type = '[Users] Add';

  constructor(public payload: User[]) {
  }
}
