import { IUser} from './user';
import {IEntity} from './entity';

export interface IMessages extends IEntity {
  text: string;
  userId: string;
  user: IUser;
}
