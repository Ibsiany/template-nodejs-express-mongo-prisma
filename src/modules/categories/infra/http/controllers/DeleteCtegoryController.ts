import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteCategoryService } from '../../../services/DeleteCategoryService';

export class DeleteCtegoryController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const deleteCategoryService = container.resolve(DeleteCategoryService);

    const { id } = request.params;

    await deleteCategoryService.execute(id);

    return response.status(204).send();
  }
}
