import { compare, hash } from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { inject, injectable } from 'tsyringe';
import LibError from '../../../shared/errors/LibError';
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO';
import { IUser } from '../dtos/IUser';
import { IUserRepository } from '../repositories/IUserRepository';

@injectable()
export class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
  ) {}

  async execute({
    id,
    password,
    name,
    email,
    photo,
    new_password,
  }: IUpdateUserDTO): Promise<IUser> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new LibError('User does not exists', 404);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new LibError('Password incorrect');
    }

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }

    if (photo) {
      fs.rmdirSync(path.join(__dirname, `../../../../uploads/${user.photo}`));

      user.photo = photo;
    }

    if (new_password) {
      const hashedPassword = await hash(new_password, 8);

      user.password = hashedPassword;
    }

    await this.usersRepository.update(user);

    return { ...user, password: '' };
  }
}
