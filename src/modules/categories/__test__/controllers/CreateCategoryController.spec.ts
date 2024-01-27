import request from 'supertest';
import { app } from '../../../../shared/infra/http/app';
import { ICategory } from '../../dtos/ICategory';
import { CreateCategoryService } from '../../services/CreateCategoryService';

jest.mock('../../services/CreateCategoryService');
const createCategoryServiceeMock = CreateCategoryService as jest.MockedClass<
  typeof CreateCategoryService
>;

describe('Create category controller test', () => {
  beforeEach(async () => {
    createCategoryServiceeMock.mockClear();
  });

  it('Should be able to create a category', async () => {
    await createCategoryServiceeMock.prototype.execute.mockResolvedValueOnce(
      {} as ICategory,
    );

    const response = await request(app).post(`/category/uuid`).send({
      name: 'Category test',
    });

    expect(response.status).toEqual(201);
  });
});
