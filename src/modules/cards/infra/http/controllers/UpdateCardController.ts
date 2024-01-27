import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateCardService } from '../../../services/UpdateCardService';

export class UpdateCardController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateCardService = container.resolve(UpdateCardService);

    const { description, title, status } = request.body;

    const { id } = request.params;

    const play = await updateCardService.execute({
      id,
      description,
      title,
      status,
    });

    return response.status(201).json(play);
  }
}
