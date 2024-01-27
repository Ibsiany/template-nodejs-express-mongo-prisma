import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';
import LibError from '../../../../shared/errors/LibError';
import { ICreateCardDTO } from '../../dtos/ICreateCardDTO';
import { ICardRepository } from '../../repositories/ICardRepository';
import { CardRepositoryInMemory } from '../../repositories/inMemory/CardRepositoryInMemory';
import { DeleteCardService } from '../../services/DeleteCardService';

describe('Delete card service', () => {
  let cardRepositoryInMemory: ICardRepository;
  let deleteCardUseCase: DeleteCardService;

  beforeEach(() => {
    cardRepositoryInMemory = new CardRepositoryInMemory();
    deleteCardUseCase = new DeleteCardService(cardRepositoryInMemory);
  });

  it('should be able to delete card', async () => {
    const card: ICreateCardDTO = {
      status: '10',
      title: 'Test',
      description: 'Test card',
      user_id: 'uuid',
    };

    const cardCreated = await cardRepositoryInMemory.create(card);

    await deleteCardUseCase.execute(cardCreated.id);
  });

  it('should not be able to delete card does not exists', async () => {
    await expect(deleteCardUseCase.execute(uuidv4())).rejects.toEqual(
      new LibError('The card does not exist', 404),
    );
  });
});
