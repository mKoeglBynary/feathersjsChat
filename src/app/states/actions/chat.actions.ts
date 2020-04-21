import { IMessage } from '../../models/interfaces/message.model.i';

export class AddMessage {
  static readonly type = '[Message] Add';

  constructor(public readonly payload: IMessage ) {
  }
}

export class AddMessages {
  static readonly type = '[Messages] Add';

  constructor(public readonly payload: IMessage[]) {
  }
}
