import { ICard } from '../../cards/dtos/ICard';
import { ICategory } from '../../categories/dtos/ICategory';

export interface IUser {
  id: string;
  created_at: Date;
  updated_at: Date;
  name: string;
  email: string;
  password: string;
  photo: string | null;
  category?: ICategory[];
  cards?: ICard[];
}
