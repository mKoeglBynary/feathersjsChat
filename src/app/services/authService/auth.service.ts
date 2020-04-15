import { Injectable } from '@angular/core';
import {FeathersService} from '../feathersService/feathers.service';
import {User} from '../../interfaces/user';



enum Feathers {
  Strategy = 'local',
  Authentication = 'authentication',
  LocationMessages = 'messages',
  LocationUsers = 'users',
  EventCreated = 'created'
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  app = this.feathersService.app;

  constructor(
    private feathersService: FeathersService,
  ) { }

  async login(data?: Partial<User>): Promise< Partial<User> > {
    try {
      if (!data) {
        await this.app.reAuthenticate();
      } else {
        await this.app.authenticate({
            strategy: Feathers.Strategy,
            ...data
        });
      }
      const {user} =  await this.app.get(Feathers.Authentication);
      return user;

    } catch (error) {
      return null;
    }
  }

  async logout(): Promise<void> {
    this.removeFeathersjsListeners();
    await this.app.logout();
  }

  async removeFeathersjsListeners(): Promise<void> {
    await this.app.service(Feathers.LocationMessages).off(Feathers.EventCreated);
    await this.app.service(Feathers.LocationUsers).off(Feathers.EventCreated);
  }

  async changeLanguage(lang: string) {
    const {user} = await this.app.get(Feathers.Authentication);
    await this.app.service(Feathers.LocationUsers).patch(user._id, {language: lang});
  }

  async register(data: Partial<User>): Promise<boolean> {
    try {
      await this.app.service(Feathers.LocationUsers).create(data);
      return true;
    } catch (error) {
      return false;
    }
  }
}
