import { Inject, Injectable } from '@angular/core';
import feathersAuthClient from '@feathersjs/authentication-client';
import { Application } from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import { fromEvent, Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { FeathersEndpoint } from '../../models/configs/feathers-endpoints.model';
import { FeathersEvent } from '../../models/configs/feathers-event.model';
import { IEntity } from '../../models/interfaces/entity/entity.model.i';
import { IMessage } from '../../models/interfaces/message.model.i';
import { IUser } from '../../models/interfaces/user.model.i';
import { FEATHERS_APP_TOKEN } from '../../provider/feathers-app.provider';

@Injectable({
    providedIn: 'root'
})
export class FeathersService {

    constructor(
        @Inject(FEATHERS_APP_TOKEN) private readonly _app: Application
    ) {
        const socket: SocketIOClient.Socket = io(environment.feathersSettings.url);
        this._app.configure(socketio(socket));
        this._app.configure(feathersAuthClient({
            storageKey: environment.feathersSettings.storageKey
        }));
    }

    async getMessages(): Promise<IMessage[]> {
        const result = await this._app.service(FeathersEndpoint.MESSAGES).find({
            query: {
                $sort: { createdAt: -1 },
                $limit: 25
            }
        });
        return Array.isArray(result) ? result : result.data;
    }

    getNewMessages(): Observable<IMessage> {
        return this._getNewData(FeathersEndpoint.MESSAGES);
    }

    getNewUsers(): Observable<IUser> {
        return this._getNewData(FeathersEndpoint.USERS);
    }

    private _getNewData<T extends IEntity>(endpoint: FeathersEndpoint): Observable<T> {
        return fromEvent(this._app.service(endpoint), FeathersEvent.CREATED);
    }

    async getUsers(): Promise<IUser[]> {
        const result = await this._app.service(FeathersEndpoint.USERS).find();
        return Array.isArray(result) ? result : result.data;
    }

    async sendMessage(text: string): Promise<void> {
        await this._app.service(FeathersEndpoint.MESSAGES).create({
            text
        });
    }
}
