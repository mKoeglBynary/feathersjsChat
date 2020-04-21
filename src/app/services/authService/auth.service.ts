import { Injectable } from '@angular/core';
import {FeathersService} from '../feathersService/feathers.service';
import {FeathersEvent} from '../../models/configs/feathers-event.model';
import {FEATHERS_SETTINGS} from '../../../environments/environment';
import {IUser} from '../../models/interfaces/user.model.i';
import {Language} from '../../models/configs/language-options.model';
import {Application} from '@feathersjs/feathers';
import {FeathersEndpoint} from '../../models/configs/feathers-endpoints.model';

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
            strategy: FEATHERS_SETTINGS.strategy,
            ...data
        });
      }
      const {user} =  await this._app.get(FeathersEndpoint.AUTHENTICATION);
      return user;

    } catch (error) {
    }
  }

  async logout(): Promise<void> {
    this.removeFeathersjsListeners();
    await this._app.logout();
  }

  removeFeathersjsListeners(): void {
    this._app.service(FeathersEndpoint.MESSAGES).off(FeathersEvent.CREATED);
    this._app.service(FeathersEndpoint.USERS).off(FeathersEvent.CREATED);
  }

  async changeLanguage(lang: Language) {
    const {user} = await this._app.get(FeathersEndpoint.AUTHENTICATION);
    await this._app.service(FeathersEndpoint.USERS).patch(user._id, {language: lang});
  }

  async register(data: Partial<IUser>): Promise<boolean> {
    try {
      await this._app.service(FeathersEndpoint.USERS).create(data);
      return true;
    } catch (error) {
      return false;
    }
  }
}
