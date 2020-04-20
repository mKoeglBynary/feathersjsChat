import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {IUser} from '../../interfaces/user';
import {AddUser, AddUsers} from '../actions/user.action';


@Injectable({
  providedIn: 'root'
})
export class UsersFacade {
  constructor(
    private store: Store
  ) {}

  getAllUsers(): Observable<IUser[]> {
    return this.store.select( state => state.user.users);
  }

  addUser(user: IUser) {
    this.store.dispatch(new AddUser(user));
  }

  addUsers(users: IUser[]) {
    this.store.dispatch(new AddUsers(users));
  }
}

