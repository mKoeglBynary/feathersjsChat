import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {UserLogin, UserLogout, UserRegister} from '../actions/activeUser.actions';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  constructor(
    private store: Store
  ) {}

  login(user): void {
    this.store.dispatch(new UserLogin(user));
  }

  logout(): void {
    this.store.dispatch(new UserLogout());
  }

  register(user): void {
    this.store.dispatch(new UserRegister(user)).subscribe(obj => {
      if (obj) {
        this.login(user);
      }
    });
  }

  getLoggedIn(): Observable<boolean> {
    return this.store.select(state => state.activeUser.isLoggedIn);
  }

}
