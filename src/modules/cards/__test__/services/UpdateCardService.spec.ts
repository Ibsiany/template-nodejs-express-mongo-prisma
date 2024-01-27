import 'reflect-metadata';
import LibError from '../../../../shared/errors/LibError';
import { ICategoryRepository } from '../../../categories/repositories/ICategoryRepository';
import { CategoryRepositoryInMemory } from '../../../categories/repositories/inMemory/CategoryRepositoryInMemory';
import { ICreateCardDTO } from '../../dtos/ICreateCardDTO';
import { IUpdateCardServiceDTO } from '../../dtos/IUpdateCardServiceDTO';
import { ICardRepository } from '../../repositories/ICardRepository';
import { CardRepositoryInMemory } from '../../repositories/inMemory/CardRepositoryInMemory';
import { UpdateCardService } from '../../services/UpdateCardService';

describe('Update card service', () => {
  let cardRepositoryInMemory: ICardRepository;
  let categoryRepositoryInMemory: ICategoryRepository;
  let updateCardService: UpdateCardService;

  beforeEach(() => {
    cardRepositoryInMemory = new CardRepositoryInMemory();
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    updateCardService = new UpdateCardService(
      cardRepositoryInMemory,
      categoryRepositoryInMemory,
    );
  });

  it('should be able to update user', async () => {
    const card: ICreateCardDTO = {
      status: '10',
      title: 'Test',
      description: 'Test card',
      user_id: 'uuid',
    };

    const cardCreated = await cardRepositoryInMemory.create(card);

    const cardUpdate = await updateCardService.execute({
      ...cardCreated,
      status: '20',
    });

    expect(cardCreated).toHaveProperty('id');
    expect(cardCreated.status).toEqual(cardUpdate.status);
  });

  it('should not be able to update card does not exists', async () => {
    await expect(
      updateCardService.execute({
        id: 'uuid',
        description: 'test',
      } as IUpdateCardServiceDTO),
    ).rejects.toEqual(new LibError('the card does not exist', 404));
  });
});
