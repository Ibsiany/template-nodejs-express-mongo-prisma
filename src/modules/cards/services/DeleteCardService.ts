import { inject, injectable } from 'tsyringe';
import LibError from '../../../shared/errors/LibError';
import { ICardRepository } from '../repositories/ICardRepository';

@injectable()
export class DeleteCardService {
  constructor(
    @inject('CardRepository')
    private cardRepository: ICardRepository,
  ) {}

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new LibError('The property id is required!');
    }

    const card = await this.cardRepository.findById(id);

    if (!card) {
      throw new LibError('The card does not exist', 404);
    }

    await this.cardRepository.delete(card);
  }
}
