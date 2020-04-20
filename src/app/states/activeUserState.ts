import {IUser} from '../interfaces/user';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable, NgZone} from '@angular/core';
import {UserChangeLanguage, UserErrors, UserLogin, UserLogout, UserRegister} from './actions/active-user.actions';
import {AuthService} from '../services/authService/auth.service';
import {Router} from '@angular/router';
import {Language} from '../configs/language-settings.config';

export interface ActiveUserStateModel {
  user: IUser | {};
  isLoggedIn: boolean;
  language: Language;
  errors?: string;
}

@State<ActiveUserStateModel>({
  name: 'activeUser',
  defaults: {
    user: {},
    isLoggedIn: false,
    language: Language.ENGLISH
  }
})
@Injectable()
export class ActiveUserState {
  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _ngZone: NgZone,
  ) {}

  @Selector()
  static getLoggedIn(state: ActiveUserStateModel): boolean {
    return state.isLoggedIn;
  }

  @Selector()
  static getErrors(state: ActiveUserStateModel): string {
    return state.errors;
  }

  @Selector()
  static getLanguage(state: ActiveUserStateModel): Language {
    return state.language;
  }

  @Action(UserErrors)
  userErrors({patchState}: StateContext<ActiveUserStateModel>, {payload}: UserErrors): void {
    patchState({
      errors: payload
    });
  }

  @Action(UserRegister)
  userRegister({dispatch, patchState}: StateContext<ActiveUserStateModel>, {payload}: UserRegister) {
    this._authService.register(payload).then(obj => {
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
  async userLogin({patchState}: StateContext<ActiveUserStateModel>, {payload}: UserLogin): Promise<void> {
    const user: IUser = await this._authService.login(payload);
    if (!user) {
      patchState({
        errors: 'LOGIN.ERRORS.AUTH.WRONGINPUT'
      });
    } else {
      patchState({
        user,
        isLoggedIn: true,
        errors: '',
        language: user.language
      });

      this.navigateTo('/chat');
    }
  }

  @Action(UserLogout)
  async userLogout( {patchState}: StateContext<ActiveUserStateModel>): Promise<void> {
    await this._authService.logout();
    patchState({
      user: {},
      isLoggedIn: false
    });
    this.navigateTo('');
  }

  @Action(UserChangeLanguage)
  async userChangeLanguage( {patchState, getState}: StateContext<ActiveUserStateModel>, {payload}: UserChangeLanguage): Promise<void> {
    const state: ActiveUserStateModel = getState();
    if (state.isLoggedIn) {
      await this._authService.changeLanguage(payload);
    }
    patchState({
      language: payload
    });
  }

  navigateTo(item): void {
    this._ngZone.run( () => {
        this._router.navigate([item]);
      }
    );
  }

}
