import request from 'supertest';
import { app } from '../../../../shared/infra/http/app';
import { DeleteCategoryService } from '../../services/DeleteCategoryService';

jest.mock('../../services/DeleteCategoryService');
const deleteCategoryServiceMock = DeleteCategoryService as jest.MockedClass<
  typeof DeleteCategoryService
>;

describe('Delete category controller test', () => {
  beforeEach(async () => {
    deleteCategoryServiceMock.mockClear();
  });

  it('Should be able to delete a category', async () => {
    deleteCategoryServiceMock.prototype.execute.mockResolvedValueOnce();

    const response = await request(app).delete(`/category/:uuid`);

    expect(response.status).toEqual(204);
  });
});
