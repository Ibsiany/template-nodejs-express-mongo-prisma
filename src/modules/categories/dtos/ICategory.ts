import { ICard } from '../../cards/dtos/ICard';
import { IUser } from '../../users/dtos/IUser';

export interface ICategory {
  id: string;
  created_at: Date;
  updated_at: Date;
  name: string;
  user_id: string;
  user?: IUser;
  cards?: ICard[];
}
