import {InjectionToken} from '@angular/core';
import feathers from '@feathersjs/feathers';


const APP = feathers();

export const FEATHERS_APP_TOKEN = new InjectionToken<string>('FEATHERS_APP_TOKEN');

export const FEATHERS_APP_PROVIDER = {
  provide: FEATHERS_APP_TOKEN,
  useFactory: () => APP
};
