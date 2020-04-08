import {User} from '../interfaces/user';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable, NgZone} from '@angular/core';
import {UserErrors, UserLogin, UserLogout, UserRegister} from './actions/activeUser.actions';
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

  @Selector()
  static getErrors(state: ActiveUserStateModel) {
    return state.errors;
  }

  @Action(UserErrors)
  userErrors({patchState}: StateContext<ActiveUserStateModel>, {payload}: UserErrors) {
    patchState({
      errors: {...payload}
    });
  }

  @Action(UserRegister)
  userRegister({dispatch, patchState}: StateContext<ActiveUserStateModel>, {payload}: UserRegister) {
    this.authService.register(payload).then(obj => {
      if (obj) {
        dispatch(new UserLogin(payload));
      } else {
        patchState({
          errors: 'Already registered'
        });
      }
    });
  }


  @Action(UserLogin)
  async userLogin({patchState}: StateContext<ActiveUserStateModel>, {payload}: UserLogin) {
    const user = await this.authService.login(payload);
    if (!user) {
      patchState({
        errors: 'Wrong E-Mail or password'
      });
    } else {
      patchState({
        user,
        isLoggedIn: true,
        errors: {}
      });

      this.navigateTo('/chat');
    }
  }

  @Action(UserLogout)
  async userLogout( {patchState}: StateContext<ActiveUserStateModel>) {
    await this.authService.logout();
    patchState({
      user: {},
      isLoggedIn: false
    });
    this.navigateTo('');
  }

  navigateTo(item) {
    this.ngZone.run( () => {
        this.router.navigate([item]);
      }
    );
  }

}
