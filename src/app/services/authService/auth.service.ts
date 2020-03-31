import { Injectable } from '@angular/core';
import {FeathersService} from '../feathersService/feathers.service';
import {ActiveUserFacade} from '../../states/facade/activeUserFacade';
import {User} from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  app = this.feathersService.app;

  constructor(
    private feathersService: FeathersService,
    private activeUserFacade: ActiveUserFacade,
  ) { }

  async login(data?) {
    try {
      if (!data) {
        await this.app.reAuthenticate();
      } else {
        await this.app.authenticate({
            strategy: 'local',
            ...data
        });
      }
      const {user} = await this.app.get('authentication');
      this.activeUserFacade.login(user);
    } catch (error) {
      return;
    }
  }

  async logout() {
    this.activeUserFacade.logout();
    this.removeFeathersjsListeners();
    await this.app.logout();
  }

  async removeFeathersjsListeners() {
    await this.app.service('messages').off('created');
    await this.app.service('users').off('created');
  }

  async register(data) {
    try {
      await this.app.service('users').create(data);
    } catch (error) {
      return;
    }
  }
}
