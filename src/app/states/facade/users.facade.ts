import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {IUser} from '../../models/interfaces/user.model.i';
import {AddUser, AddUsers} from '../actions/user.action';
import {UserState} from '../user.state';


@Injectable({
  providedIn: 'root'
})
export class UsersFacade {
  constructor(
    private readonly _store: Store
  ) {}

  getAllUsers(): Observable<IUser[]> {
    return this._store.select(UserState.users);
  }

  addUser(user: IUser) {
    this._store.dispatch(new AddUser(user));
  }

  addUsers(users: IUser[]) {
    this._store.dispatch(new AddUsers(users));
  }
}

