import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {delay, tap} from 'rxjs/operators';
import {FeathersService} from '../feathersService/feathers.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  app = this.feathersService.app;

  constructor(
    private feathersService: FeathersService
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
      this.isLoggedIn = true;
      return true;
    } catch (error) {
      return false;
    }
  }

  async logout() {
    this.isLoggedIn = false;
    await this.app.logout();
  }

  async register(data) {
    try {
      await this.app.service('users').create(data);
    } catch (e) {
      return false;
    }
    await this.login(data);
    return true;
  }
}
