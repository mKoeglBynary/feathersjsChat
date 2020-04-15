import { Injectable } from '@angular/core';
import {FeathersService} from '../feathersService/feathers.service';
import {FeathersSettings} from '../../configs/feathers-settings.config';
import {User} from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  app = this.feathersService.app;

  constructor(
    private feathersService: FeathersService,
  ) { }

  async login(data?: Partial<User>): Promise< User > {
    try {
      if (!data) {
        await this.app.reAuthenticate();
      } else {
        await this.app.authenticate({
            strategy: FeathersSettings.Strategy,
            ...data
        });
      }
      const {user} =  await this.app.get(FeathersSettings.Authentication);
      return user;

    } catch (error) {
    }
  }

  async logout(): Promise<void> {
    this.removeFeathersjsListeners();
    await this.app.logout();
  }

  async removeFeathersjsListeners(): Promise<void> {
    await this.app.service(FeathersSettings.LocationMessages).off(FeathersSettings.EventCreated);
    await this.app.service(FeathersSettings.LocationUsers).off(FeathersSettings.EventCreated);
  }

  async changeLanguage(lang: string) {
    const {user} = await this.app.get(FeathersSettings.Authentication);
    await this.app.service(FeathersSettings.LocationUsers).patch(user._id, {language: lang});
  }

  async register(data: Partial<User>): Promise<boolean> {
    try {
      await this.app.service(FeathersSettings.LocationUsers).create(data);
      return true;
    } catch (error) {
      return false;
    }
  }
}
