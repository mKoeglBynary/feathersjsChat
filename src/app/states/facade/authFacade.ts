import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {UserLogin, UserLogout, UserRegister, UserErrors, UserChangeLanguage} from '../actions/active-user.actions';
import {Observable} from 'rxjs';
import {User} from '../../interfaces/user';
import {LanguageSetting} from '../../configs/language-settings.config';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  constructor(
    private store: Store
  ) {}

  login(user?: Partial<User>): void {
    this.store.dispatch(new UserLogin(user));
  }

  logout(): void {
    this.store.dispatch(new UserLogout());
  }

  register(user: Partial<User>): void {
    this.store.dispatch(new UserRegister(user));
  }

  addErrors(errors: string) {
    this.store.dispatch(new UserErrors(errors));
  }

  getLoggedIn(): Observable<boolean> {
    return this.store.select(state => state.activeUser.isLoggedIn);
  }

  getErrors(): Observable<string> {
    return this.store.select(state => state.activeUser.errors);
  }

  changeLanguage(lang: LanguageSetting): void {
    this.store.dispatch(new UserChangeLanguage(lang));
  }

  getLanguage(): Observable<string> {
    return this.store.select(state => state.activeUser.language);
  }

}
