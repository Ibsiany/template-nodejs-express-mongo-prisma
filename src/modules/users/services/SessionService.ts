import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';
import LibError from '../../../shared/errors/LibError';
import { IUser } from '../dtos/IUser';
import { IUserRepository } from '../repositories/IUserRepository';

interface IResponse {
  user: IUser;
  token: string;
}

@injectable()
export class SessionService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
  ) {}

  async execute(email: string, password: string): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new LibError('Incorrect email/password');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new LibError('Incorrect email/password');
    }

    const token = sign({}, uuidV4(), {
      subject: user.id,
      expiresIn: 1,
    });

    return {
      user,
      token,
    };
  }
}
