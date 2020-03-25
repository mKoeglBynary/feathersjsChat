import { Injectable } from '@angular/core';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import * as io from 'socket.io-client';
import feathersAuthClient from '@feathersjs/authentication-client';
import {from, Observable, of} from 'rxjs';

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

  async register(data) {
    try {
      await this.app.service('users').create(data);
    } catch (e) {
      return false;
    }
    await this.login(data);
    return true;
  }

  async login(data?) {
    try {
      if (!data) {
        await this.app.reAuthenticate();
      } else {
        await this.app.authenticate({
          strategy: 'local',
          ...data
        });
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  async logout() {
    await this.app.logout();
  }

  async sendMessage(text) {
   await this.app.service('messages').create({
      text
    });
  }
}
