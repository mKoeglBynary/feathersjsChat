import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IMessage } from '../../models/interfaces/message.model.i';
import { ChatActions } from '../actions/chat.actions';
import { ChatState } from '../chat.state';

@Injectable({
    providedIn: 'root'
})
export class ChatFacade {
    constructor(
        private readonly _store: Store
    ) {
    }

    getAllMessages(): Observable<IMessage[]> {
        return this._store.select(ChatState.messages);
    }

    addMessage(message: IMessage) {
        this._store.dispatch(new ChatActions.AddMessage(message));
    }

    setMessages(messages: IMessage[]) {
        this._store.dispatch(new ChatActions.SetMessages(messages));
    }
}
