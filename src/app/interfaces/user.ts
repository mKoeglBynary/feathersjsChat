import {Language} from '../configs/language-settings.config';

export interface IUser {
  _id: string;
  avatar: string;
  email: string;
  language: Language;
  password?: string;
}
