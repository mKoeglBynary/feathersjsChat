import { Injectable } from '@angular/core';
import {FeathersService} from '../feathersService/feathers.service';
import {ServiceName, ServiceEvent} from '../../configs/feathers-settings.config';
import {FeathersEnvironment} from '../../../environments/environment';
import {User} from '../../interfaces/user';
import {Language} from '../../configs/language-settings.config';

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
            strategy: FeathersEnvironment.strategy,
            ...data
        });
      }
      const {user} =  await this.app.get(ServiceName.AUTHENTICATION);
      return user;

    } catch (error) {
    }
  }

  async logout(): Promise<void> {
    this.removeFeathersjsListeners();
    await this.app.logout();
  }

  async removeFeathersjsListeners(): Promise<void> {
    await this.app.service(ServiceName.MESSAGES).off(ServiceEvent.CREATED);
    await this.app.service(ServiceName.USERS).off(ServiceEvent.CREATED);
  }

  async changeLanguage(lang: Language) {
    const {user} = await this.app.get(ServiceName.AUTHENTICATION);
    await this.app.service(ServiceName.USERS).patch(user._id, {language: lang});
  }

  async register(data: Partial<User>): Promise<boolean> {
    try {
      await this.app.service(ServiceName.USERS).create(data);
      return true;
    } catch (error) {
      return false;
    }
  }
}
