import 'reflect-metadata';
import { ICreateCardDTO } from '../../dtos/ICreateCardDTO';
import { ICardRepository } from '../../repositories/ICardRepository';
import { CardRepositoryInMemory } from '../../repositories/inMemory/CardRepositoryInMemory';
import { GetCardsService } from '../../services/GetCardsService';

describe('Get cards service', () => {
  let cardRepositoryInMemory: ICardRepository;
  let getCardsService: GetCardsService;

  beforeEach(() => {
    cardRepositoryInMemory = new CardRepositoryInMemory();
    getCardsService = new GetCardsService(cardRepositoryInMemory);
  });

  it('should be able to get card', async () => {
    const card: ICreateCardDTO = {
      status: '10',
      title: 'Test',
      description: 'Test card',
      user_id: 'uuid',
    };

    const cardCreated = await cardRepositoryInMemory.create(card);

    const findCard = await getCardsService.execute({
      user_id: cardCreated.user_id,
    });

    expect(findCard).toHaveLength(1);
    expect(findCard[0].id).toEqual(cardCreated.id);
    expect(findCard[0].title).toEqual(cardCreated.title);
  });
});
