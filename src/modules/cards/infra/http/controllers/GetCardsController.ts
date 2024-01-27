import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetCardsService } from '../../../services/GetCardsService';

export class GetCardsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const getCardsService = container.resolve(GetCardsService);

    const { query } = request;
    const { user_id } = request.params;

    const play = await getCardsService.execute({
      ...query,
      user_id,
    });

    return response.json(play);
  }
}
