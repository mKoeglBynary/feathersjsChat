import { Language } from '../configs/language-options.model';
import { IEntity } from './entity/entity.model.i';

export interface IUser extends IEntity {
    avatar: string;
    email: string;
    language: Language;
    password?: string;
}
