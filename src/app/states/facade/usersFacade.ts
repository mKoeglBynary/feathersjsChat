import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {User} from '../../interfaces/user';
import {AddUser, AddUsers} from '../actions/user.action';


@Injectable({
  providedIn: 'root'
})
export class UsersFacade {
  constructor(
    private store: Store
  ) {}

  getAllUsers(): Observable<User[]> {
    return this.store.select( state => state.user.users);
  }

  addUser(user: User) {
    this.store.dispatch(new AddUser(user));
  }

  addUsers(users: User[]) {
    this.store.dispatch(new AddUsers(users));
  }
}

