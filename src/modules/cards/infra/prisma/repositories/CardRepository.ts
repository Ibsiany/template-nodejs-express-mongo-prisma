import { prisma } from '../../../../../prisma';
import { ICard } from '../../../dtos/ICard';
import { ICreateCardDTO } from '../../../dtos/ICreateCardDTO';
import { IGetAllCardsDTO } from '../../../dtos/IGetAllCardsDTO';
import { ICardRepository } from '../../../repositories/ICardRepository';

export class CardRepository implements ICardRepository {
  async create({
    description,
    status,
    title,
    user_id,
  }: ICreateCardDTO): Promise<ICard> {
    return prisma.cards.create({
      data: {
        description,
        status,
        title,
        user_id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  }

  async update(card: ICard): Promise<ICard> {
    const { id, ...data } = card;

    return prisma.cards.update({
      where: { id }, // Use _id for MongoDB
      data,
    });
  }

  async findById(id: string): Promise<ICard | null> {
    return prisma.cards.findUnique({ where: { id } });
  }

  async findAll({
    id,
    description,
    status,
    title,
    user_id,
  }: IGetAllCardsDTO): Promise<ICard[]> {
    return prisma.cards.findMany({
      where: {
        user_id,
        id: id ? { equals: id } : undefined,
        description: description
          ? { contains: description.toLowerCase() }
          : undefined,
        status: status ? { equals: status } : undefined,
        title: title ? { contains: title.toLowerCase() } : undefined,
      },
    });
  }

  async delete(card: ICard): Promise<void> {
    await prisma.cards.delete({
      where: { id: card.id },
    });
  }
}
