import {State, Action, StateContext, Selector, Select} from '@ngxs/store';
import {IMessages} from '../interfaces/messages';
import {AddMessage, AddMessages} from './actions/chat.actions';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

export interface ChatStateModel {
  messages: IMessages[];
}

@State<ChatStateModel>({
  name: 'chat',
  defaults: {
    messages: [],
  }
})
@Injectable()
export class ChatState {


  @Selector()
  static messages(state: ChatStateModel): IMessages[] {
    return state.messages;
  }

  @Action(AddMessage)
  addMessage( {getState, patchState}: StateContext<ChatStateModel>, {payload}: AddMessage): void {
    const state = getState();
    patchState({
      messages: [payload, ...state.messages]
    });
  }

  @Action(AddMessages)
  addMessages( {patchState}: StateContext<ChatStateModel>, {payload}: AddMessages): void {
    patchState({
      messages: [...payload]
    });
  }

}
