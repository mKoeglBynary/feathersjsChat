import { Injectable } from '@angular/core';
import {FeathersService} from '../feathersService/feathers.service';
import {ServiceName, ServiceEvent} from '../../configs/feathers-settings.config';
import {FeathersEnvironment} from '../../../environments/environment';
import {IUser} from '../../interfaces/user';
import {Language} from '../../configs/language-settings.config';
import {Application} from '@feathersjs/feathers';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _app: Application;

  constructor( private readonly _feathersService: FeathersService) {
    this._app = _feathersService.app;
  }

  async login(data?: Partial<IUser>): Promise< IUser > {
    try {
      if (!data) {
        await this._app.reAuthenticate();
      } else {
        await this._app.authenticate({
            strategy: FeathersEnvironment.strategy,
            ...data
        });
      }
      const {user} =  await this._app.get(ServiceName.AUTHENTICATION);
      return user;

    } catch (error) {
    }
  }

  async logout(): Promise<void> {
    this.removeFeathersjsListeners();
    await this._app.logout();
  }

  removeFeathersjsListeners(): void {
    this._app.service(ServiceName.MESSAGES).off(ServiceEvent.CREATED);
    this._app.service(ServiceName.USERS).off(ServiceEvent.CREATED);
  }

  async changeLanguage(lang: Language) {
    const {user} = await this._app.get(ServiceName.AUTHENTICATION);
    await this._app.service(ServiceName.USERS).patch(user._id, {language: lang});
  }

  async register(data: Partial<IUser>): Promise<boolean> {
    try {
      await this._app.service(ServiceName.USERS).create(data);
      return true;
    } catch (error) {
      return false;
    }
  }
}
