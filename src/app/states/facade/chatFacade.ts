import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import { Store } from '@ngxs/store';
import {AddMessage, AddMessages} from '../actions/chat.actions';
import {IMessages} from '../../interfaces/messages';

@Injectable({
  providedIn: 'root'
})
export class ChatFacade {
  constructor(
    private store: Store
  ) {}

  getAllMessages(): Observable<IMessages[]> {
    return this.store.select(state => state.chat.messages);
  }

  addMessage(message: IMessages) {
    this.store.dispatch(new AddMessage(message));
  }

  addMessages(messages: IMessages[]) {
    this.store.dispatch(new AddMessages(messages));
  }
}
