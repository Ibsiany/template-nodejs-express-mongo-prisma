import { ICategory } from '../dtos/ICategory';

export interface ICategoryRepository {
  create(name: string, user_id: string): Promise<ICategory>;
  findAll(user_id: string, name?: string): Promise<ICategory[]>;
  findById(id: string): Promise<ICategory | null>;
  delete(category: ICategory): Promise<void>;
}
