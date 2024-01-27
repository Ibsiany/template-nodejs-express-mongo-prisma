/* eslint-disable no-return-await */
import { prisma } from '../../../../prisma';
import { IUser } from '../../../users/dtos/IUser';
import { ICategory } from '../../dtos/ICategory';
import { CategoryRepository } from '../../infra/prisma/repositories/CategoryRepository';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';

describe('Category repository test', () => {
  let categoryRepository: ICategoryRepository;

  let user: IUser;

  beforeAll(async () => {
    categoryRepository = new CategoryRepository();

    user = await prisma.user.create({
      data: {
        name: 'test',
        email: 'test@test',
        password: '1234',
      },
    });
  });

  afterEach(async () => {
    await prisma.category.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
  });

  it('Should be able to create a category', async () => {
    const name = 'test';

    const category = await categoryRepository.create(name, user.id);

    expect(category).toHaveProperty('id');
    expect(category.name).toEqual(name);
  });

  it('Should be able to delete category', async () => {
    const name = 'test 1';

    const category = await categoryRepository.create(name, user.id);

    await categoryRepository.delete(category);

    const foundCategory = await categoryRepository.findById(category.id);

    expect(foundCategory).toBeNull();
  });

  it('Should be able to find by ID', async () => {
    const name = 'test 2';

    const category = await categoryRepository.create(name, user.id);

    const foundCategory = (await categoryRepository.findById(
      category.id,
    )) as ICategory;

    expect(foundCategory.id).toEqual(category.id);
  });

  it('Should be able to find all with filter name', async () => {
    const name = 'test 3';

    const category = await categoryRepository.create(name, user.id);

    const foundCategories = await categoryRepository.findAll(
      user.id,
      category.name,
    );

    expect(foundCategories).toHaveLength(1);
    expect(foundCategories[0].id).toEqual(category.id);
  });

  it('Should be able to find all', async () => {
    const name = 'test 4';

    const foundCategoriesDeleted = await categoryRepository.findAll(user.id);

    foundCategoriesDeleted.forEach(
      async category => await categoryRepository.delete(category),
    );

    const category = await categoryRepository.create(name, user.id);

    const foundCategories = await categoryRepository.findAll(user.id, name);

    expect(foundCategories).toHaveLength(1);
    expect(foundCategories[0].id).toEqual(category.id);
  });
});
