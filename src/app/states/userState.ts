import {State, Action, StateContext, Selector, Select} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {User} from '../interfaces/user';
import {AddUser, AddUsers} from './actions/user.action';

export class UserStateModel {
  users: User[];
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    users: []
  }
})
@Injectable()
export class UserState {

  @Selector()
  static getUsers(state: UserStateModel) {
    return state.users;
  }

  @Action(AddUser)
  addUser( {getState, patchState}: StateContext<UserStateModel>, {payload}: AddUser) {
    const state = getState();
    patchState({
      users: [...state.users, payload]
    });
  }

  @Action(AddUsers)
  addUsers( {getState, patchState}: StateContext<UserStateModel>, {payload}: AddUsers) {
    const state = getState();
    patchState( {
      users: [...payload]
    });
  }
}
