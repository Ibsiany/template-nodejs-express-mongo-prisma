import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetUserByIdService } from '../../../services/GetUserByIdService';

export class GetUserByIdController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const getUserByIdUseCase = container.resolve(GetUserByIdService);

    const { id } = request.params;

    const user = await getUserByIdUseCase.execute(id);

    return response.json(user);
  }
}
