import { Injectable } from '@angular/core';
import {FeathersService} from '../feathersService/feathers.service';
import {AuthFacade} from '../../states/facade/authFacade';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  app = this.feathersService.app;

  constructor(
    private feathersService: FeathersService,
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
      const {user} =  await this.app.get('authentication');
      return user;
    } catch (error) {
      return null;
    }
  }

  async logout() {
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
      return true;
    } catch (error) {
      return null;
    }
  }
}
