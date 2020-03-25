import { Injectable } from '@angular/core';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import * as io from 'socket.io-client';
import feathersAuthClient from '@feathersjs/authentication-client';

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

  async register(data) {
    try {
      await this.app.service('users').create(data);
    } catch (e) {
      console.log(e);
      return false;
    }

    await this.login(data);
    return true;
  }

  login(data) {
    console.log('trying to log in...');
  }
}
