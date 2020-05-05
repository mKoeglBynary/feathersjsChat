import { Inject, Injectable } from '@angular/core';
import { Application } from '@feathersjs/feathers';
import { environment } from '../../../environments/environment';
import { FeathersEndpoint } from '../../models/configs/feathers-endpoints.model';
import { FeathersEvent } from '../../models/configs/feathers-event.model';
import { Language } from '../../models/configs/language-options.model';
import { IUser } from '../../models/interfaces/user.model.i';
import { FEATHERS_APP_TOKEN } from '../../provider/feathers-app.provider';
import { FeathersService } from '../feathers-service/feathers.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(@Inject(FEATHERS_APP_TOKEN) private readonly _app: Application,
                private readonly _feathersService: FeathersService) {
    }

    async login(data?: Partial<IUser>): Promise<IUser> {
        try {
            if (!data) {
                await this._app.reAuthenticate();
            } else {
                await this._app.authenticate({
                    strategy: environment.feathersSettings.strategy,
                    ...data
                });
            }
            const { user } = await this._app.get(FeathersEndpoint.AUTHENTICATION);
            return user;

        } catch (error) {
        }
    }

    async logout(): Promise<void> {
        this.removeFeathersjsListeners();
        await this._app.logout();
    }

    async changeLanguage(lang: Language) {
        const { user } = await this._app.get(FeathersEndpoint.AUTHENTICATION);
        await this._app.service(FeathersEndpoint.USERS).patch(user._id, { language: lang });
    }

    async register(data: Partial<IUser>): Promise<boolean> {
        try {
            await this._app.service(FeathersEndpoint.USERS).create(data);
            return true;
        } catch (error) {
            return false;
        }
    }

    private removeFeathersjsListeners(): void {
        this._app.service(FeathersEndpoint.MESSAGES).off(FeathersEvent.CREATED);
        this._app.service(FeathersEndpoint.USERS).off(FeathersEvent.CREATED);
    }
}
