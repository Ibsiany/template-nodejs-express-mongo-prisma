import 'reflect-metadata';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUser } from '../../dtos/IUser';
import { IUserRepository } from '../../repositories/IUserRepository';
import { UserRepositoryInMemory } from '../../repositories/inMemory/UserRepositoryInMemory';
import { GetUserByIdService } from '../../services/GetUserByIdService';

describe('Get user by id service', () => {
  let userRepositoryInMemory: IUserRepository;
  let getUserByIdService: GetUserByIdService;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    getUserByIdService = new GetUserByIdService(userRepositoryInMemory);
  });

  it('should be able to get user by id', async () => {
    const user: ICreateUserDTO = {
      email: 'example@example.com',
      password: '1234',
      name: 'User test',
    } as ICreateUserDTO;

    const userCreated = (await userRepositoryInMemory.create(user)) as IUser;

    const findUser = await getUserByIdService.execute(userCreated?.id);

    expect(findUser.id).toEqual(userCreated.id);
    expect(findUser.name).toEqual(user.name);
    expect(findUser.email).toEqual(user.email);
  });
});
