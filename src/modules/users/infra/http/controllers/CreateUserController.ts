import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserService } from '../../../services/CreateUserService';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createUserService = container.resolve(CreateUserService);

    const { name, email, password } = request.body;

    const photo = request?.file?.filename;

    const user = await createUserService.execute({
      name,
      email,
      password,
      photo,
    });

    return response.status(201).json(user);
  }
}
