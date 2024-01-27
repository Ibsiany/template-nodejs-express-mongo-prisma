import request from 'supertest';
import { app } from '../../../../shared/infra/http/app';
import { ICategory } from '../../dtos/ICategory';
import { GetCategoriesService } from '../../services/GetCategoriesService';

jest.mock('../../services/GetCategoriesService');
const getCategoriesServiceMock = GetCategoriesService as jest.MockedClass<
  typeof GetCategoriesService
>;

describe('Get category by id controller test', () => {
  beforeEach(async () => {
    getCategoriesServiceMock.mockClear();
  });

  it('Should be able to get category by id', async () => {
    const category = {} as ICategory;

    getCategoriesServiceMock.prototype.execute.mockResolvedValueOnce([
      category,
    ]);

    const response = await request(app).get(`/category/uuid`);

    expect(response.body).toEqual([category]);
    expect(response.status).toEqual(200);
  });
});
