import { Injectable } from '@angular/core';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import * as io from 'socket.io-client';
import feathersAuthClient from '@feathersjs/authentication-client';
import {from, Observable} from 'rxjs';
import {ServiceName, ServiceEvent} from '../../configs/feathers-settings.config';
import {Messages} from '../../interfaces/messages';
import {User} from '../../interfaces/user';
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

   getMessages(): Observable<any> {
        return from(this.app.service(ServiceName.MESSAGES).find({
          query: {
            $sort: { createdAt: -1},
            $limit: 25
          }
    }));
  }

  getNewMessages(addMessage: (message: Messages) => void ): void {
    this.app.service(ServiceName.MESSAGES).on(ServiceEvent.CREATED, addMessage);
  }

  getNewUsers(addUser: (user: User) => void ): void {
    this.app.service(ServiceName.USERS).on(ServiceEvent.CREATED, addUser);
  }

  getUsers(): Observable<any> {
    return from(this.app.service(ServiceName.USERS).find());
  }

  async sendMessage(text: string): Promise<void> {
    console.log(text);
    await this.app.service(ServiceName.MESSAGES).create({
      text
    });
  }
}
