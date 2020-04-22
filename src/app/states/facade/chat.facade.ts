import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import { Store } from '@ngxs/store';
import {AddMessage, AddMessages} from '../actions/chat.actions';
import {IMessage} from '../../models/interfaces/message.model.i';
import {ChatState} from '../chat.state';

@Injectable({
  providedIn: 'root'
})
export class ChatFacade {
  constructor(
    private readonly _store: Store
  ) {}

  getAllMessages(): Observable<IMessage[]> {
    return this._store.select(ChatState.messages);
  }

  addMessage(message: IMessage) {
    this._store.dispatch(new AddMessage(message));
  }

  addMessages(messages: IMessage[]) {
    this._store.dispatch(new AddMessages(messages));
  }
}
