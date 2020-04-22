import {Injectable} from '@angular/core';
import feathers, {Application} from '@feathersjs/feathers';
import feathersAuthClient from '@feathersjs/authentication-client';
import socketio from '@feathersjs/socketio-client';
import * as io from 'socket.io-client';
import {fromEvent, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {IMessage} from '../../models/interfaces/message.model.i';
import {IUser} from '../../models/interfaces/user.model.i';
import {FeathersEvent} from '../../models/configs/feathers-event.model';
import {FeathersEndpoint} from '../../models/configs/feathers-endpoints.model';

@Injectable({
  providedIn: 'root'
})
export class FeathersService {
  readonly app: Application;

  constructor() {
    this.app = feathers();
    const socket: SocketIOClient.Socket = io(environment.FEATHERS_SETTINGS.url);
    this.app.configure(socketio(socket));
    this.app.configure(feathersAuthClient({
      storageKey: environment.FEATHERS_SETTINGS.storageKey
    }));
  }

   async getMessages(): Promise<IMessage[]> {
    const dataObj = await this.app.service(FeathersEndpoint.MESSAGES).find({
          query: {
            $sort: { createdAt: -1},
            $limit: 25
          }
    });
    return dataObj.data;
  }

  getNewMessages(): Observable<IMessage> {
    return fromEvent(this.app.service(FeathersEndpoint.MESSAGES), FeathersEvent.CREATED);
  }

  getNewUsers(): Observable<IUser> {
    return fromEvent(this.app.service(FeathersEndpoint.USERS), FeathersEvent.CREATED);
  }

  async getUsers(): Promise<IUser[]> {
    const dataObj = await this.app.service(FeathersEndpoint.USERS).find();
    return dataObj.data;
  }

  async sendMessage(text: string): Promise<void> {
    await this.app.service(FeathersEndpoint.MESSAGES).create({
      text
    });
  }
}
