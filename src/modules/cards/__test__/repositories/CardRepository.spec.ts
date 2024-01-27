/* eslint-disable no-return-await */
import { prisma } from '../../../../prisma';
import { IUser } from '../../../users/dtos/IUser';
import { ICard } from '../../dtos/ICard';
import { ICreateCardDTO } from '../../dtos/ICreateCardDTO';
import { IGetAllCardsDTO } from '../../dtos/IGetAllCardsDTO';
import { CardRepository } from '../../infra/prisma/repositories/CardRepository';
import { ICardRepository } from '../../repositories/ICardRepository';

describe('Card repository test', () => {
  let cardRepository: ICardRepository;

  let user: IUser;

  beforeAll(async () => {
    cardRepository = new CardRepository();

    user = await prisma.user.create({
      data: {
        name: 'test',
        email: 'test@test',
        password: '1234',
      },
    });
  });

  afterEach(async () => {
    await prisma.cards.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
  });

  it('Should be able to create a card', async () => {
    const card: ICreateCardDTO = {
      status: '10',
      title: 'Test 1',
      description: 'Test card 1',
      user_id: user.id,
    };

    const createdCard = await cardRepository.create(card);

    expect(createdCard).toHaveProperty('id');
    expect(createdCard.status).toEqual(card.status);
  });

  it('Should be able to delete card', async () => {
    const card: ICreateCardDTO = {
      status: '10',
      title: 'Test 2',
      description: 'Test card 2',
      user_id: user.id,
    };

    const createdCard = await cardRepository.create(card);

    await cardRepository.delete(createdCard);

    const foundCard = await cardRepository.findById(createdCard.id);

    expect(foundCard).toBeNull();
  });

  it('Should be able to update card', async () => {
    const card: ICreateCardDTO = {
      status: '10',
      title: 'Test 3',
      description: 'Test card 3',
      user_id: user.id,
    };

    const createdCard = await cardRepository.create(card);

    createdCard.status = '20';

    const updateCard = await cardRepository.update(createdCard);

    expect(updateCard.status).toEqual('20');
  });

  it('Should be able to find by ID', async () => {
    const card: ICreateCardDTO = {
      status: '10',
      title: 'Test 4',
      description: 'Test card 4',
      user_id: user.id,
    };

    const createdCard = await cardRepository.create(card);

    const foundCard = (await cardRepository.findById(createdCard.id)) as ICard;

    expect(foundCard.id).toEqual(createdCard.id);
  });

  it('Should be able to find all', async () => {
    const foundCardSDeleted = await cardRepository.findAll({
      user_id: user.id,
    } as IGetAllCardsDTO);

    foundCardSDeleted.forEach(async card => await cardRepository.delete(card));

    const card: ICreateCardDTO = {
      status: '10',
      title: 'Test 5',
      description: 'Test card 5',
      user_id: user.id,
    };

    const createdCard = await cardRepository.create(card);

    const foundCard = await cardRepository.findAll({
      user_id: createdCard.user_id,
    } as IGetAllCardsDTO);

    expect(foundCard).toHaveLength(1);
    expect(foundCard[0].id).toEqual(createdCard.id);
  });
});
