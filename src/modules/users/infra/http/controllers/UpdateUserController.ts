import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserService } from '../../../services/UpdateUserService';

export class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateUserUseCase = container.resolve(UpdateUserService);

    const { name, email, password, new_password } = request.body;

    const photo = request?.file?.filename;
    const { id } = request.params;

    const user = await updateUserUseCase.execute({
      id,
      password,
      new_password,
      name,
      email,
      photo,
    });

    return response.status(201).json(user);
  }
}
