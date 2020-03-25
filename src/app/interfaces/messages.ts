import { User} from './user';

export interface Messages {
  text: string;
  userId: string;
  createdAt: number;
  _id: string;
  user: User;
}
