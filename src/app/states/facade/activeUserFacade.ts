import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {UserLogin, UserLogout} from '../actions/activeUser.actions';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveUserFacade {
  constructor(
    private store: Store
  ) {}

  login(user): void {
    this.store.dispatch(new UserLogin(user));
  }

  logout(): void {
    this.store.dispatch(new UserLogout());
  }

  getLoggedIn(): Observable<boolean> {
    return this.store.select(state => state.activeUser.isLoggedIn);
  }

}
