import {State, Action, StateContext, Selector} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {IUser} from '../models/interfaces/user.model.i';
import {UserActions} from './actions/user.action';

export interface IUserStateModel {
  users: IUser[];
}

@State<IUserStateModel>({
  name: 'user',
  defaults: {
    users: []
  }
})
@Injectable()
export class UserState {

  @Selector()
  static users(state: IUserStateModel): IUser[] {
    return state.users;
  }

  @Action(UserActions.AddUser)
  addUser({getState, patchState}: StateContext<IUserStateModel>, {payload}: UserActions.AddUser): void {
    const state = getState();
    patchState({
      users: [...state.users, payload]
    });
  }

  @Action(UserActions.AddUsers)
  addUsers({getState, patchState}: StateContext<IUserStateModel>, {payload}: UserActions.AddUsers): void {
    patchState( {
      users: [...payload]
    });
  }
}
