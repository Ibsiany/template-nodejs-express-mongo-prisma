import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteCardService } from '../../../services/DeleteCardService';

export class DeleteCardController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const deleteCardService = container.resolve(DeleteCardService);

    const { id } = request.params;

    await deleteCardService.execute(id);

    return response.status(204).send();
  }
}
