import { IUser} from './user.model.i';
import {IEntity} from './entity.model.i';

export interface IMessage extends IEntity {
  text: string;
  userId: string;
  user: IUser;
}
