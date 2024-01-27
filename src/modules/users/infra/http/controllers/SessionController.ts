import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SessionService } from '../../../services/SessionService';

export class SessionController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const sessionUser = container.resolve(SessionService);

    const { email, password } = request.body;

    const { user, token } = await sessionUser.execute(email, password);

    return response.json({
      user,
      token,
    });
  }
}
