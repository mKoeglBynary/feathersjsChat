import { IMessages } from '../../interfaces/messages';

export class AddMessage {
  static readonly type = '[Message] Add';

  constructor(public payload: IMessages ) {
  }
}

export class AddMessages {
  static readonly type = '[Messages] Add';

  constructor(public payload: IMessages[]) {
  }
}
