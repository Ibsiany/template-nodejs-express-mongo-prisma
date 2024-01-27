import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';
import LibError from '../../../../shared/errors/LibError';
import { ICardRepository } from '../../../cards/repositories/ICardRepository';
import { CardRepositoryInMemory } from '../../../cards/repositories/inMemory/CardRepositoryInMemory';
import { ICategoryRepository } from '../../../categories/repositories/ICategoryRepository';
import { CategoryRepositoryInMemory } from '../../../categories/repositories/inMemory/CategoryRepositoryInMemory';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUser } from '../../dtos/IUser';
import { IUserRepository } from '../../repositories/IUserRepository';
import { UserRepositoryInMemory } from '../../repositories/inMemory/UserRepositoryInMemory';
import { DeleteUserService } from '../../services/DeleteUserService';

describe('Delete user service', () => {
  let userRepositoryInMemory: IUserRepository;
  let cardRepositoryInMemory: ICardRepository;
  let categoryRepositoryInMemory: ICategoryRepository;
  let deleteUserUseCase: DeleteUserService;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    cardRepositoryInMemory = new CardRepositoryInMemory();
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    deleteUserUseCase = new DeleteUserService(
      userRepositoryInMemory,
      categoryRepositoryInMemory,
      cardRepositoryInMemory,
    );
  });

  it('should be able to delete user', async () => {
    const user: ICreateUserDTO = {
      email: 'example@example.com',
      password: '1234',
      name: 'User test',
    };

    const userCreated = (await userRepositoryInMemory.create(user)) as IUser;

    await deleteUserUseCase.execute(userCreated.id);
  });

  it('should not be able to delete user does not exists', async () => {
    await expect(deleteUserUseCase.execute(uuidv4())).rejects.toEqual(
      new LibError('User does not exists!', 404),
    );
  });
});
