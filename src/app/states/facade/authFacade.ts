import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {UserLogin, UserLogout, UserRegister, UserErrors, UserChangeLanguage} from '../actions/activeUser.actions';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  constructor(
    private store: Store
  ) {}

  login(user?): void {
    this.store.dispatch(new UserLogin(user));
  }

  logout(): void {
    this.store.dispatch(new UserLogout());
  }

  register(user): void {
    this.store.dispatch(new UserRegister(user));
  }

  addErrors(errors) {
    this.store.dispatch(new UserErrors(errors));
  }

  getLoggedIn(): Observable<boolean> {
    return this.store.select(state => state.activeUser.isLoggedIn);
  }

  getErrors(): Observable<any> {
    return this.store.select(state => state.activeUser.errors);
  }

  changeLanguage(lang) {
    this.store.dispatch(new UserChangeLanguage(lang));
  }

  getLanguage(): Observable<string> {
    return this.store.select(state => state.activeUser.language);
  }

}
