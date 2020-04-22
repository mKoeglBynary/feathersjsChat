import {State, Action, StateContext, Selector, Select} from '@ngxs/store';
import {IMessage} from '../models/interfaces/message.model.i';
import {AddMessage, AddMessages} from './actions/chat.actions';
import {Injectable} from '@angular/core';

export interface IChatStateModel {
  messages: IMessage[];
}

@State<IChatStateModel>({
  name: 'chat',
  defaults: {
    messages: [],
  }
})
@Injectable()
export class ChatState {


  @Selector()
  static messages(state: IChatStateModel): IMessage[] {
    return state.messages;
  }

  @Action(AddMessage)
  addMessage({getState, patchState}: StateContext<IChatStateModel>, {payload}: AddMessage): void {
    const state = getState();
    patchState({
      messages: [payload, ...state.messages]
    });
  }

  @Action(AddMessages)
  addMessages({patchState}: StateContext<IChatStateModel>, {payload}: AddMessages): void {
    patchState({
      messages: [...payload]
    });
  }

}
