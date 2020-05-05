import { IEntity } from './entity/entity.model.i';
import { IUser } from './user.model.i';

export interface IMessage extends IEntity {
    text: string;
    userId: string;
    user: IUser;
}
