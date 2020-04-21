import { IUser} from '../../models/interfaces/user.model.i';

export class AddUser {
  static readonly type = '[User] Add';

  constructor(public readonly payload: IUser) {
  }
}

export class AddUsers {
  static readonly  type = '[Users] Add';

  constructor(public readonly payload: IUser[]) {
  }
}
