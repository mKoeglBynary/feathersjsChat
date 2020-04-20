import {IUser} from '../../interfaces/user';
import {Language} from '../../configs/language-settings.config';

export class UserLogin {
  static readonly type = '[User] login';
  constructor(public payload?: Partial<IUser>) {}
}

export class UserLogout {
  static readonly type = '[User] logout';
}

export class UserRegister {
  static readonly type = '[User] register';
  constructor(public payload: Partial<IUser>) {}
}

export class UserErrors {
  static readonly type = '[User] errors';
  constructor(public payload: string) {
  }
}

export class UserChangeLanguage {
  static readonly type = '[User] change language';
  constructor(public payload: Language) {
  }
}
