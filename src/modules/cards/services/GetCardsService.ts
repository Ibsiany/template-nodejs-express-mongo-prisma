import { inject, injectable } from 'tsyringe';
import { ICard } from '../dtos/ICard';
import { IGetAllCardsDTO } from '../dtos/IGetAllCardsDTO';
import { ICardRepository } from '../repositories/ICardRepository';

@injectable()
export class GetCardsService {
  constructor(
    @inject('CardRepository')
    private cardRepository: ICardRepository,
  ) {}

  async execute(query: IGetAllCardsDTO): Promise<ICard[]> {
    return this.cardRepository.findAll(query);
  }
}
