import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCategoryService } from '../../../services/CreateCategoryService';

export class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createCategoryService = container.resolve(CreateCategoryService);

    const { name } = request.body;
    const { user_id } = request.params;

    const category = await createCategoryService.execute(name, user_id);

    return response.status(201).json(category);
  }
}
