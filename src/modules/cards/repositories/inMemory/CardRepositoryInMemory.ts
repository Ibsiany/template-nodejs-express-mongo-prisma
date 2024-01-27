import { v4 as uuidv4 } from 'uuid';
import { ICard } from '../../dtos/ICard';
import { ICreateCardDTO } from '../../dtos/ICreateCardDTO';
import { IGetAllCardsDTO } from '../../dtos/IGetAllCardsDTO';
import { ICardRepository } from '../ICardRepository';

export class CardRepositoryInMemory implements ICardRepository {
  cards: ICard[] = [];

  async create({
    description,
    status,
    title,
    user_id,
  }: ICreateCardDTO): Promise<ICard> {
    const card = {} as ICard;

    Object.assign(card, {
      id: uuidv4(),
      description,
      status,
      title,
      user_id,
    });

    this.cards.push(card);

    return card;
  }

  async update(card: ICard): Promise<ICard> {
    const oldCard = this.cards.find(foundCard => foundCard.id === card.id);

    if (oldCard) {
      Object.assign(oldCard, card);
    } else {
      this.cards.push(card);
    }

    return card;
  }

  async findById(id: string): Promise<ICard | null> {
    return this.cards.find(card => card.id === id) || null;
  }

  async findAll({
    user_id,
    status,
    title,
    description,
    id,
  }: IGetAllCardsDTO): Promise<ICard[]> {
    let findCards = this.cards.filter(card => card.user_id === user_id);

    if (status) {
      findCards = this.cards.filter(card => card.status === status);
    }

    if (title) {
      findCards = this.cards.filter(card => card.title.includes(title));
    }

    if (description) {
      findCards = this.cards.filter(card =>
        card.description.includes(description),
      );
    }

    if (id) {
      findCards = this.cards.filter(card => card.id === id);
    }

    return findCards;
  }

  async delete(card: ICard): Promise<void> {
    this.cards.splice(this.cards.indexOf(card));
  }
}
