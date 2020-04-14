import { Injectable } from '@angular/core';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import * as io from 'socket.io-client';
import feathersAuthClient from '@feathersjs/authentication-client';
import {from, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeathersService {
  app;
  socket;

  constructor() {
    this.initialize();
  }

  initialize() {
    this.app = feathers();
    this.socket = io('http://localhost:3030');
    this.app.configure(socketio(this.socket));
    this.app.configure(feathersAuthClient({
      storageKey: 'auth'
    }));
  }

   getMessages(): Observable<any> {
        return from(this.app.service('messages').find({
          query: {
            $sort: { createdAt: -1},
            $limit: 25
          }
    }));
  }

  getNewMessages(addMessage) {
    return this.app.service('messages').on('created', addMessage);
  }

  getNewUsers(addUser) {
    return this.app.service('users').on('created', addUser);
  }

  getUsers(): Observable<any> {
    return from(this.app.service('users').find());
  }

  async sendMessage(text) {
   await this.app.service('messages').create({
      text
    });
  }
}
