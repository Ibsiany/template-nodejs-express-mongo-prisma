import { inject, injectable } from 'tsyringe';
import LibError from '../../../shared/errors/LibError';
import { IGetAllCardsDTO } from '../../cards/dtos/IGetAllCardsDTO';
import { ICardRepository } from '../../cards/repositories/ICardRepository';
import { ICategoryRepository } from '../../categories/repositories/ICategoryRepository';
import { IUserRepository } from '../repositories/IUserRepository';

@injectable()
export class DeleteUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,

    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,

    @inject('CardRepository')
    private cardRepository: ICardRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new LibError('User does not exists!', 404);
    }

    const categories = await this.categoryRepository.findAll(id);

    for await (const category of categories) {
      try {
        await this.categoryRepository.delete(category);
      } catch (err) {
        throw new LibError(`Error deleting category ${err}`);
      }
    }

    const cards = await this.cardRepository.findAll({
      user_id: id,
    } as IGetAllCardsDTO);

    for await (const card of cards) {
      try {
        await this.cardRepository.delete(card);
      } catch (err) {
        throw new LibError(`Error deleting card ${err}`);
      }
    }

    await this.usersRepository.delete(user);
  }
}
