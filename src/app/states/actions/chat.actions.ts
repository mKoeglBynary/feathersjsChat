import { Messages } from '../../interfaces/messages';

export class AddMessage {
  static readonly type = '[Message] Add';

  constructor(public payload: Messages ) {
  }
}

export class AddMessages {
  static readonly type = '[Messages] Add';

  constructor(public payload: Messages[]) {
  }
}
