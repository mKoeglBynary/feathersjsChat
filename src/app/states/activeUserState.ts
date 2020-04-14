import {User} from '../interfaces/user';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable, NgZone} from '@angular/core';
import {UserChangeLanguage, UserErrors, UserLogin, UserLogout, UserRegister} from './actions/activeUser.actions';
import {AuthService} from '../services/authService/auth.service';
import {Router} from '@angular/router';

export class ActiveUserStateModel {
  user: User | {};
  isLoggedIn: boolean;
  language: string;
  errors?: {};
}

@State<ActiveUserStateModel>({
  name: 'activeUser',
  defaults: {
    user: {},
    isLoggedIn: false,
    language: 'en'
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

  @Selector()
  static getLanguage(state: ActiveUserStateModel) {
    return state.language;
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
          errors: 'LOGIN.ERRORS.AUTH.REGISTERED'
        });
      }
    });
  }


  @Action(UserLogin)
  async userLogin({patchState}: StateContext<ActiveUserStateModel>, {payload}: UserLogin) {
    const user = await this.authService.login(payload);
    if (!user) {
      patchState({
        errors: 'LOGIN.ERRORS.AUTH.WRONGINPUT'
      });
    } else {
      patchState({
        user,
        isLoggedIn: true,
        errors: {},
        language: user.language
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

  @Action(UserChangeLanguage)
  async userChangeLanguage( {patchState, getState}: StateContext<ActiveUserStateModel>, {payload}: UserChangeLanguage) {
    // TODO: change in Database
    const state = getState();
    if (state.isLoggedIn){
      await this.authService.changeLanguage(payload);
    }
    patchState({
      language: payload
    });
  }

  navigateTo(item) {
    this.ngZone.run( () => {
        this.router.navigate([item]);
      }
    );
  }

}
