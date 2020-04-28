import {State, Action, StateContext, Selector, Select} from '@ngxs/store';
import {IMessage} from '../models/interfaces/message.model.i';
import {ChatActions} from './actions/chat.actions';
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

  @Action(ChatActions.AddMessage)
  addMessage({getState, patchState}: StateContext<IChatStateModel>, {payload}: ChatActions.AddMessage): void {
    const state = getState();
    patchState({
      messages: [payload, ...state.messages]
    });
  }

  @Action(ChatActions.SetMessages)
  setMessages({patchState}: StateContext<IChatStateModel>, {payload}: ChatActions.SetMessages): void {
    patchState({
      messages: [...payload]
    });
  }

}
