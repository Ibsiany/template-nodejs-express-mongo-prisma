import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetCategoriesService } from '../../../services/GetCategoriesService';

export class GetCategoriesController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const getCategoriesService = container.resolve(GetCategoriesService);

    const { query } = request;
    const { user_id } = request.params;

    const categories = await getCategoriesService.execute({
      ...query,
      user_id,
    });

    return response.json(categories);
  }
}
