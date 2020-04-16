import {User} from '../interfaces/user';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable, NgZone} from '@angular/core';
import {UserChangeLanguage, UserErrors, UserLogin, UserLogout, UserRegister} from './actions/active-user.actions';
import {AuthService} from '../services/authService/auth.service';
import {Router} from '@angular/router';
import {LanguageSetting} from '../configs/language-settings.config';

export class ActiveUserStateModel {
  user: User | {};
  isLoggedIn: boolean;
  language: string;
  errors?: string;
}

@State<ActiveUserStateModel>({
  name: 'activeUser',
  defaults: {
    user: {},
    isLoggedIn: false,
    language: LanguageSetting.EN
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
  static getLoggedIn(state: ActiveUserStateModel): boolean {
    return state.isLoggedIn;
  }

  @Selector()
  static getErrors(state: ActiveUserStateModel): string {
    return state.errors;
  }

  @Selector()
  static getLanguage(state: ActiveUserStateModel): string {
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
  async userLogin({patchState}: StateContext<ActiveUserStateModel>, {payload}: UserLogin): Promise<void> {
    const user: User = await this.authService.login(payload);
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
    await this.authService.logout();
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
      await this.authService.changeLanguage(payload);
    }
    patchState({
      language: payload
    });
  }

  navigateTo(item): void {
    this.ngZone.run( () => {
        this.router.navigate([item]);
      }
    );
  }

}
