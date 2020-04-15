import { Injectable } from '@angular/core';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import * as io from 'socket.io-client';
import feathersAuthClient from '@feathersjs/authentication-client';
import {from, Observable} from 'rxjs';
import {FeathersSettings} from '../../configs/feathers-settings.config';
import {Messages} from '../../interfaces/messages';
import {User} from '../../interfaces/user';

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
    this.socket = io(FeathersSettings.Url);
    this.app.configure(socketio(this.socket));
    this.app.configure(feathersAuthClient({
      storageKey: FeathersSettings.StorageKey
    }));
  }

   getMessages(): Observable<any> {
        return from(this.app.service(FeathersSettings.LocationMessages).find({
          query: {
            $sort: { createdAt: -1},
            $limit: 25
          }
    }));
  }

  getNewMessages(addMessage: (message: Messages) => void ): void {
    this.app.service(FeathersSettings.LocationMessages).on(FeathersSettings.EventCreated, addMessage);
  }

  getNewUsers(addUser: (user: User) => void ): void {
    this.app.service(FeathersSettings.LocationUsers).on(FeathersSettings.EventCreated, addUser);
  }

  getUsers(): Observable<any> {
    return from(this.app.service(FeathersSettings.LocationUsers).find());
  }

  async sendMessage(text: string): Promise<void> {
   await this.app.service(FeathersSettings.LocationMessages).create({
      text
    });
  }
}
