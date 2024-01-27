import { ICard } from '../dtos/ICard';
import { ICreateCardDTO } from '../dtos/ICreateCardDTO';
import { IGetAllCardsDTO } from '../dtos/IGetAllCardsDTO';

export interface ICardRepository {
  create(new_play: ICreateCardDTO): Promise<ICard>;
  update(user: ICard): Promise<ICard>;
  findById(id: string): Promise<ICard | null>;
  findAll(query: IGetAllCardsDTO): Promise<ICard[]>;
  delete(user: ICard): Promise<void>;
}
