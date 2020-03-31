import {User} from '../../interfaces/user';

export class UserLogin {
  static readonly type = '[User] login';
  constructor(public payload: User) {}
}

export class UserLogout {
  static readonly type = '[User] logout';
}
