import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUser } from '../dtos/IUser';

export interface IUserRepository {
  create(new_user: ICreateUserDTO): Promise<IUser>;
  update(user: IUser): Promise<IUser>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  delete(user: IUser): Promise<void>;
}
