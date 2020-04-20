import {State, Action, StateContext, Selector} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {IUser} from '../interfaces/user';
import {AddUser, AddUsers} from './actions/user.action';

export class UserStateModel {
  users: IUser[];
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
  static getUsers(state: UserStateModel): IUser[] {
    return state.users;
  }

  @Action(AddUser)
  addUser( {getState, patchState}: StateContext<UserStateModel>, {payload}: AddUser): void {
    const state = getState();
    patchState({
      users: [...state.users, payload]
    });
  }

  @Action(AddUsers)
  addUsers( {getState, patchState}: StateContext<UserStateModel>, {payload}: AddUsers): void {
    patchState( {
      users: [...payload]
    });
  }
}
