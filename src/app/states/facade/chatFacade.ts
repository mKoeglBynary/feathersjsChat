import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import { Store } from '@ngxs/store';
import {AddMessage, AddMessages} from '../actions/chat.actions';
import {IMessages} from '../../interfaces/messages';
import {ChatState} from '../chatState';

@Injectable({
  providedIn: 'root'
})
export class ChatFacade {
  constructor(
    private readonly _store: Store
  ) {}

  getAllMessages(): Observable<IMessages[]> {
    return this._store.select(ChatState.messages);
  }

  addMessage(message: IMessages) {
    this._store.dispatch(new AddMessage(message));
  }

  addMessages(messages: IMessages[]) {
    this._store.dispatch(new AddMessages(messages));
  }
}
