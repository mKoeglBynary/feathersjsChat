import {User} from '../interfaces/user';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable, NgZone} from '@angular/core';
import {UserLogin, UserLogout, UserRegister} from './actions/activeUser.actions';
import {AuthService} from '../services/authService/auth.service';
import {Router} from '@angular/router';

export class ActiveUserStateModel {
  user: User | {};
  isLoggedIn: boolean;
  errors?: {};
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
  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone,
  ) {}

  @Selector()
  static getLoggedIn(state: ActiveUserStateModel) {
    return state.isLoggedIn;
  }

  @Action(UserRegister)
  async userRegister({getState, patchState}: StateContext<ActiveUserStateModel>, {payload}: UserRegister) {
    await this.authService.register(payload);
  }


  @Action(UserLogin)
  async userLogin({patchState}: StateContext<ActiveUserStateModel>, {payload}: UserLogin) {
    const user = await this.authService.login(payload);
    if (!user) {
    } else {
      patchState({
        user,
        isLoggedIn: true
      });
      this.ngZone.run( () => {
        this.router.navigate(['/chat']);
      }
    );
    }
  }

  @Action(UserLogout)
  userLogout( {patchState}: StateContext<ActiveUserStateModel>) {
    patchState({
      user: {},
      isLoggedIn: false
    });
  }

}
