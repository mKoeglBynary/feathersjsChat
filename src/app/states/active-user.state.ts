import {IUser} from '../models/interfaces/user.model.i';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable, NgZone} from '@angular/core';
import {UserChangeLanguage, UserAuthError, UserLogin, UserLogout, UserRegister} from './actions/active-user.actions';
import {AuthService} from '../services/auth-service/auth.service';
import {Router} from '@angular/router';
import {Language} from '../models/configs/language-options.model';

export interface IActiveUserStateModel {
  user: IUser | {};
  isLoggedIn: boolean;
  language: Language;
  authError?: string;
}

@State<IActiveUserStateModel>({
  name: 'activeUser',
  defaults: {
    user: {},
    isLoggedIn: false,
    language: Language.EN
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
  static isLoggedIn(state: IActiveUserStateModel): boolean {
    return state.isLoggedIn;
  }

  @Selector()
  static authError(state: IActiveUserStateModel): string {
    return state.authError;
  }

  @Selector()
  static language(state: IActiveUserStateModel): Language {
    return state.language;
  }

  @Action(UserAuthError)
  userErrors({patchState}: StateContext<IActiveUserStateModel>, {payload}: UserAuthError): void {
    patchState({
      authError: payload
    });
  }

  @Action(UserRegister)
  async userRegister({dispatch, patchState}: StateContext<IActiveUserStateModel>, {payload}: UserRegister) {
    const result: boolean = await this._authService.register(payload);
    if (result) {
      dispatch(new UserLogin(payload));
    } else {
      patchState({
        authError: 'LOGIN.ERRORS.AUTH.REGISTERED'
      });
    }
  }


  @Action(UserLogin)
  async userLogin({patchState}: StateContext<IActiveUserStateModel>, {payload}: UserLogin): Promise<void> {
    const user: IUser = await this._authService.login(payload);
    if (!user) {
      patchState({
        authError: 'LOGIN.ERRORS.AUTH.WRONG_INPUT'
      });
    } else {
      patchState({
        user,
        isLoggedIn: true,
        authError: '',
        language: user.language
      });

      this.navigateTo('/chat');
    }
  }

  @Action(UserLogout)
  async userLogout( {patchState}: StateContext<IActiveUserStateModel>): Promise<void> {
    await this._authService.logout();
    patchState({
      user: {},
      isLoggedIn: false
    });
    this.navigateTo('');
  }

  @Action(UserChangeLanguage)
  async userChangeLanguage({patchState, getState}: StateContext<IActiveUserStateModel>, {payload}: UserChangeLanguage): Promise<void> {
    const state: IActiveUserStateModel = getState();
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
