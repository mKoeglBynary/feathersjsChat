import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {UserLogin, UserLogout, UserRegister, UserAuthError, UserChangeLanguage} from '../actions/active-user.actions';
import {IUser} from '../../models/interfaces/user.model.i';
import {Language} from '../../models/configs/language-options.model';
import {ActiveUserState} from '../active-user.state';

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

  addAuthError(errors: string) {
    this._store.dispatch(new UserAuthError(errors));
  }

  getLoggedIn(): Observable<boolean> {
    return this._store.select(ActiveUserState.isLoggedIn);
  }

  getAuthError(): Observable<string> {
    return this._store.select(ActiveUserState.authError);
  }

  changeLanguage(lang: Language): void {
    this._store.dispatch(new UserChangeLanguage(lang));
  }

  getLanguage(): Observable<Language> {
    return this._store.select(ActiveUserState.language);
  }

}
