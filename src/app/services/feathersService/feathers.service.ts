import { Injectable } from '@angular/core';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import * as io from 'socket.io-client';
import feathersAuthClient from '@feathersjs/authentication-client';
import {from, fromEvent, Observable} from 'rxjs';
import {ServiceName, ServiceEvent} from '../../configs/feathers-settings.config';
import {IMessages} from '../../interfaces/messages';
import {IUser} from '../../interfaces/user';
import {FeathersEnvironment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeathersService {
  app;
  socket;

  constructor() {
    this.initialize();
  }

  initialize(): void {
    this.app = feathers();
    this.socket = io(FeathersEnvironment.url);
    this.app.configure(socketio(this.socket));
    this.app.configure(feathersAuthClient({
      storageKey: FeathersEnvironment.storageKey
    }));
  }

   async getMessages(): Promise<IMessages[]> {
    const dataObj = await this.app.service(ServiceName.MESSAGES).find({
          query: {
            $sort: { createdAt: -1},
            $limit: 25
          }
    });
    return dataObj.data;
  }

  getNewMessages(): Observable<IMessages> {
    return fromEvent(this.app.service(ServiceName.MESSAGES), ServiceEvent.CREATED);
  }

  getNewUsers(): Observable<IUser> {
    return fromEvent(this.app.service(ServiceName.USERS), ServiceEvent.CREATED);
  }

  async getUsers(): Promise<IUser[]> {
    const dataObj = await this.app.service(ServiceName.USERS).find();
    return dataObj.data;
  }

  async sendMessage(text: string): Promise<void> {
    console.log(text);
    await this.app.service(ServiceName.MESSAGES).create({
      text
    });
  }
}
