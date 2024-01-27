import request from 'supertest';
import { app } from '../../../../shared/infra/http/app';
import { ICard } from '../../dtos/ICard';
import { GetCardsService } from '../../services/GetCardsService';

jest.mock('../../services/GetCardsService');
const getCardsServiceMock = GetCardsService as jest.MockedClass<
  typeof GetCardsService
>;

describe('Get cards controller test', () => {
  beforeEach(async () => {
    getCardsServiceMock.mockClear();
  });

  it('Should be able to get cards', async () => {
    const card = {} as ICard;

    getCardsServiceMock.prototype.execute.mockResolvedValueOnce([card]);

    const response = await request(app).get(`/card/uuid`);

    expect(response.body).toEqual([card]);
    expect(response.status).toEqual(200);
  });
});
