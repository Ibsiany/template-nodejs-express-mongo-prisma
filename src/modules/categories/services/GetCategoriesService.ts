import { inject, injectable } from 'tsyringe';
import { ICategory } from '../dtos/ICategory';
import { IGetAllCategoriesDTO } from '../dtos/IGetAllCategoriesDTO';
import { ICategoryRepository } from '../repositories/ICategoryRepository';

@injectable()
export class GetCategoriesService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute({ user_id, name }: IGetAllCategoriesDTO): Promise<ICategory[]> {
    return this.categoryRepository.findAll(user_id, name);
  }
}
