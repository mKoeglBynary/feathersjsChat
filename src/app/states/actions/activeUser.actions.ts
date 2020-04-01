export class UserLogin {
  static readonly type = '[User] login';
  constructor(public payload?) {}
}

export class UserLogout {
  static readonly type = '[User] logout';
}

export class UserRegister {
  static readonly type = '[User] register';
  constructor(public payload) {}
}

export class UserErrors {
  static readonly type = '[User] errors';
  constructor(public payload) {
  }
}
