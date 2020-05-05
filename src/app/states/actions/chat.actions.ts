import { IMessage } from '../../models/interfaces/message.model.i';

export namespace ChatActions {

    export class AddMessage {
        static readonly type = '[Message] Add';

        constructor(public readonly payload: IMessage) {
        }
    }

    export class SetMessages {
        static readonly type = '[Messages] set';

        constructor(public readonly payload: IMessage[]) {
        }
    }
}
