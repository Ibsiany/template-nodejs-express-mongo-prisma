import request from 'supertest';
import { app } from '../../../../shared/infra/http/app';
import { DeleteUserService } from '../../services/DeleteUserService';

jest.mock('../../services/DeleteUserService');
const deleteUserServiceMock = DeleteUserService as jest.MockedClass<
  typeof DeleteUserService
>;

describe('Delete user controller test', () => {
  beforeEach(async () => {
    deleteUserServiceMock.mockClear();
  });

  it('Should be able to delete a user', async () => {
    deleteUserServiceMock.prototype.execute.mockResolvedValueOnce();

    const response = await request(app).delete(`/user/:uuid`);

    expect(response.status).toEqual(204);
  });
});
