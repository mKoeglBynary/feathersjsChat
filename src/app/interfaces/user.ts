import {Language} from '../configs/language-settings.config';

export interface User {
  _id: string;
  avatar: string;
  email: string;
  language: Language;
  password?: string;
}
