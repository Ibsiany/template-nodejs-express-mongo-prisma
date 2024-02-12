import { inject, injectable } from 'tsyringe';
import LibError from '../../../shared/errors/LibError';
import { ICategoryRepository } from '../../categories/repositories/ICategoryRepository';
import { ICard } from '../dtos/ICard';
import { IUpdateCardServiceDTO } from '../dtos/IUpdateCardServiceDTO';
import { ICardRepository } from '../repositories/ICardRepository';

@injectable()
export class UpdateCardService {
  constructor(
    @inject('CardRepository')
    private cardRepository: ICardRepository,

    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute({
    id,
    description,
    title,
    status,
    category_ids,
  }: IUpdateCardServiceDTO): Promise<ICard> {
    if (!id && (!description || !title || !status)) {
      throw new LibError('The id or the value was not inserted!');
    }

    const card = await this.cardRepository.findById(id);

    if (!card) {
      throw new LibError('the card does not exist', 404);
    }

    if (category_ids && category_ids?.length > 0) {
      card.categories = [];
      
      for (const category_id of category_ids) {
        const category = await this.categoryRepository.findById(category_id);

        if (category && card.categories) card.categories.push(category);
      }
    }

    if (description) {
      card.description = description;
    }

    if (title) {
      card.title = title;
    }

    if (status) {
      card.status = status;
    }

    await this.cardRepository.update(card);

    return card;
  }
}
