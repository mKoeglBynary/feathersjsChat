import {Injectable, InjectionToken} from '@angular/core';
import feathers, {Application} from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import * as io from 'socket.io-client';
import feathersAuthClient from '@feathersjs/authentication-client';
import {fromEvent, Observable} from 'rxjs';
import {FeathersEvent} from '../../models/configs/feathers-event.model';
import {IMessage} from '../../models/interfaces/message.model.i';
import {IUser} from '../../models/interfaces/user.model.i';
import {FEATHERS_SETTINGS} from '../../../environments/environment';
import {FeathersEndpoint} from '../../models/configs/feathers-endpoints.model';

@Injectable({
  providedIn: 'root'
})
export class FeathersService {
  readonly _app: Application;

  constructor() {
    this._app = feathers();
    const socket: SocketIOClient.Socket = io(FEATHERS_SETTINGS.url);
    this._app.configure(socketio(socket));
    this._app.configure(feathersAuthClient({
      storageKey: FEATHERS_SETTINGS.storageKey
    }));
  }

   async getMessages(): Promise<IMessage[]> {
    const dataObj = await this._app.service(FeathersEndpoint.MESSAGES).find({
          query: {
            $sort: { createdAt: -1},
            $limit: 25
          }
    });
    return dataObj.data;
  }

  getNewMessages(): Observable<IMessage> {
    return fromEvent(this._app.service(FeathersEndpoint.MESSAGES), FeathersEvent.CREATED);
  }

  getNewUsers(): Observable<IUser> {
    return fromEvent(this._app.service(FeathersEndpoint.USERS), FeathersEvent.CREATED);
  }

  async getUsers(): Promise<IUser[]> {
    const dataObj = await this._app.service(FeathersEndpoint.USERS).find();
    return dataObj.data;
  }

  async sendMessage(text: string): Promise<void> {
    console.log(text);
    await this._app.service(FeathersEndpoint.MESSAGES).create({
      text
    });
  }
}
