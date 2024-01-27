import request from 'supertest';
import { app } from '../../../../shared/infra/http/app';
import { ICard } from '../../dtos/ICard';
import { UpdateCardService } from '../../services/UpdateCardService';

jest.mock('../../services/UpdateCardService');
const updateCardServiceMock = UpdateCardService as jest.MockedClass<
  typeof UpdateCardService
>;

describe('Update card controller test', () => {
  beforeEach(async () => {
    updateCardServiceMock.mockClear();
  });

  it('Should be able to update a card', async () => {
    await updateCardServiceMock.prototype.execute.mockResolvedValueOnce(
      {} as ICard,
    );

    const response = await request(app).patch(`/card/uuid`).send({
      id: 'uuid',
      status: '10',
      title: 'Test',
      description: 'Test card',
    });

    expect(response.status).toEqual(201);
  });
});
