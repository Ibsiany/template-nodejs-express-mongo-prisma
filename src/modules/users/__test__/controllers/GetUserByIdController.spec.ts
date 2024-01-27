import request from 'supertest';
import { app } from '../../../../shared/infra/http/app';
import { IUser } from '../../dtos/IUser';
import { GetUserByIdService } from '../../services/GetUserByIdService';

jest.mock('../../services/GetUserByIdService');
const getUserByIdServiceMock = GetUserByIdService as jest.MockedClass<
  typeof GetUserByIdService
>;

describe('Get user by id controller test', () => {
  beforeEach(async () => {
    getUserByIdServiceMock.mockClear();
  });

  it('Should be able to get user by id', async () => {
    const user = {} as IUser;

    getUserByIdServiceMock.prototype.execute.mockResolvedValueOnce(user);

    const response = await request(app).get(`/user/uuid`);

    expect(response.body).toEqual(user);
    expect(response.status).toEqual(200);
  });
});
