import { IUser} from '../../interfaces/user';

export class AddUser {
  static readonly type = '[User] Add';

  constructor(public payload: IUser) {
  }
}

export class AddUsers {
  static readonly  type = '[Users] Add';

  constructor(public payload: IUser[]) {
  }
}
