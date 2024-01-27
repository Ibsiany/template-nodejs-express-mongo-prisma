import 'reflect-metadata';
import LibError from '../../../../shared/errors/LibError';
import { IUserRepository } from '../../../users/repositories/IUserRepository';
import { UserRepositoryInMemory } from '../../../users/repositories/inMemory/UserRepositoryInMemory';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';
import { CategoryRepositoryInMemory } from '../../repositories/inMemory/CategoryRepositoryInMemory';
import { CreateCategoryService } from '../../services/CreateCategoryService';

describe('Create category service', () => {
  let categoryRepositoryInMemory: ICategoryRepository;
  let userRepositoryInMemory: IUserRepository;
  let createCategoryService: CreateCategoryService;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    createCategoryService = new CreateCategoryService(
      categoryRepositoryInMemory,
      userRepositoryInMemory,
    );
  });

  it('should be able to create category', async () => {
    const name = 'Category test';

    const user = {
      name: 'test',
      email: 'test@test',
      password: '1234',
    };

    const userCreated = await userRepositoryInMemory.create(user);

    const categoryCreated = await createCategoryService.execute(
      name,
      userCreated.id,
    );

    expect(categoryCreated).toHaveProperty('id');
  });

  it('should not be able to create category with user does not exists', async () => {
    await expect(createCategoryService.execute('test', 'uuid')).rejects.toEqual(
      new LibError('User does not exists!', 404),
    );
  });
});
