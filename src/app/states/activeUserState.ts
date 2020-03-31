import {User} from '../interfaces/user';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {UserLogin, UserLogout} from './actions/activeUser.actions';

export class ActiveUserStateModel {
  user: User | {};
  isLoggedIn: boolean;
}

@State<ActiveUserStateModel>({
  name: 'activeUser',
  defaults: {
    user: {},
    isLoggedIn: false,
  }
})
@Injectable()
export class ActiveUserState {
  @Selector()
  static getLoggedIn(state: ActiveUserStateModel) {
    return state.isLoggedIn;
  }

  @Action(UserLogin)
  userLogin({patchState}: StateContext<ActiveUserStateModel>, {payload}: UserLogin) {
    patchState({
      user: payload,
      isLoggedIn: true
    });
  }

  @Action(UserLogout)
  userLogout( {patchState}: StateContext<ActiveUserStateModel>) {
    patchState({
      user: {},
      isLoggedIn: false
    });
  }

}
