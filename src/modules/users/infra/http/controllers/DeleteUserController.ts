import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteUserService } from '../../../services/DeleteUserService';

export class DeleteUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const deleteUserUseCase = container.resolve(DeleteUserService);

    const { id } = request.params;

    await deleteUserUseCase.execute(id);

    return response.status(204).send();
  }
}
