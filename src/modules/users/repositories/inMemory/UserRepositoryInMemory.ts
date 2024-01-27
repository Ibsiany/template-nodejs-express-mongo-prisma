import { v4 as uuidv4 } from 'uuid';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUser } from '../../dtos/IUser';
import { IUserRepository } from '../IUserRepository';

export class UserRepositoryInMemory implements IUserRepository {
  users: IUser[] = [];

  async create({
    email,
    name,
    password,
    photo,
  }: ICreateUserDTO): Promise<IUser> {
    const user = {} as IUser;

    Object.assign(user, {
      id: uuidv4(),
      email,
      password,
      name,
      photo,
    });

    this.users.push(user);

    return user;
  }

  async update(user: IUser): Promise<IUser> {
    const oldUser = this.users.find(foundUser => foundUser.id === user.id);

    if (oldUser) {
      Object.assign(oldUser, user);
    } else {
      this.users.push(user);
    }

    return user;
  }

  async findById(id: string): Promise<IUser | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.users.find(user => user.email === email) || null;
  }

  async delete(user: IUser): Promise<void> {
    this.users.splice(this.users.indexOf(user));
  }
}
