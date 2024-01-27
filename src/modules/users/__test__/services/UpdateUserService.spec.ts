import 'reflect-metadata';
import LibError from '../../../../shared/errors/LibError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUserRepository } from '../../repositories/IUserRepository';
import { UserRepositoryInMemory } from '../../repositories/inMemory/UserRepositoryInMemory';
import { CreateUserService } from '../../services/CreateUserService';
import { UpdateUserService } from '../../services/UpdateUserService';

describe('Update user service', () => {
  let userRepositoryInMemory: IUserRepository;
  let createUserService: CreateUserService;
  let updateUserService: UpdateUserService;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserService = new CreateUserService(userRepositoryInMemory);
    updateUserService = new UpdateUserService(userRepositoryInMemory);
  });

  it('should be able to update user', async () => {
    const user: ICreateUserDTO = {
      email: 'example@example.com',
      password: '1234',
      name: 'User test',
    };

    const userCreated = (await createUserService.execute(user)) as any;

    await updateUserService.execute({
      ...userCreated,
      password: user.password,
    });

    expect(userCreated).toHaveProperty('id');
    expect(userCreated.name).toEqual(user.name);
    expect(userCreated.email).toEqual(user.email);
  });

  it('should not be able to update user without user', async () => {
    const user = {
      id: 'UUID',
      email: 'example@example.com',
      password: '1234',
      name: 'User test',
    };

    await expect(updateUserService.execute(user)).rejects.toEqual(
      new LibError('User does not exists', 404),
    );
  });
});
