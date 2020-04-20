import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {UserLogin, UserLogout, UserRegister, UserErrors, UserChangeLanguage} from '../actions/active-user.actions';
import {Observable} from 'rxjs';
import {IUser} from '../../interfaces/user';
import {Language} from '../../configs/language-settings.config';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  constructor(
    private readonly _store: Store
  ) {}

  login(user?: Partial<IUser>): void {
    this._store.dispatch(new UserLogin(user));
  }

  logout(): void {
    this._store.dispatch(new UserLogout());
  }

  register(user: Partial<IUser>): void {
    this._store.dispatch(new UserRegister(user));
  }

  addErrors(errors: string) {
    this._store.dispatch(new UserErrors(errors));
  }

  getLoggedIn(): Observable<boolean> {
    return this._store.select(state => state.activeUser.isLoggedIn);
  }

  getErrors(): Observable<string> {
    return this._store.select(state => state.activeUser.errors);
  }

  changeLanguage(lang: Language): void {
    this._store.dispatch(new UserChangeLanguage(lang));
  }

  getLanguage(): Observable<Language> {
    return this._store.select(state => state.activeUser.language);
  }

}
