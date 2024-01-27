import request from 'supertest';
import { app } from '../../../../shared/infra/http/app';
import { DeleteCardService } from '../../services/DeleteCardService';

jest.mock('../../services/DeleteCardService');
const deleteCardServiceMock = DeleteCardService as jest.MockedClass<
  typeof DeleteCardService
>;

describe('Delete card controller test', () => {
  beforeEach(async () => {
    deleteCardServiceMock.mockClear();
  });

  it('Should be able to delete a card', async () => {
    deleteCardServiceMock.prototype.execute.mockResolvedValueOnce();

    const response = await request(app).delete(`/card/:uuid`);

    expect(response.status).toEqual(204);
  });
});
