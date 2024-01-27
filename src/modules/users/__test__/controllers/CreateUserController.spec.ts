import request from 'supertest';
import { app } from '../../../../shared/infra/http/app';
import { IUser } from '../../dtos/IUser';
import { CreateUserService } from '../../services/CreateUserService';

jest.mock('../../services/CreateUserService');
const createUserServiceMock = CreateUserService as jest.MockedClass<
  typeof CreateUserService
>;

describe('Create user controller test', () => {
  beforeEach(async () => {
    createUserServiceMock.mockClear();
  });

  it('Should be able to create a user', async () => {
    await createUserServiceMock.prototype.execute.mockResolvedValueOnce(
      {} as IUser,
    );

    const response = await request(app).post(`/user`).send({
      email: 'example@example.com',
      password: '1234',
      name: 'User test',
    });

    expect(response.status).toEqual(201);
  });
});
