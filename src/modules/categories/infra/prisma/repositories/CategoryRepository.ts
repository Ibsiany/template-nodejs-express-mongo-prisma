import { prisma } from '../../../../../prisma';
import { ICategory } from '../../../dtos/ICategory';
import { ICategoryRepository } from '../../../repositories/ICategoryRepository';

export class CategoryRepository implements ICategoryRepository {
  async create(name: string, user_id: string): Promise<ICategory> {
    return prisma.category.create({
      data: {
        name,
        user_id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  }

  async findAll(user_id: string, name?: string): Promise<ICategory[]> {
    return prisma.category.findMany({
      where: {
        user_id,
        name: name ? { contains: name.toLowerCase() } : undefined,
      },
    });
  }

  async findById(id: string): Promise<ICategory | null> {
    return prisma.category.findUnique({ where: { id } });
  }

  async delete(category: ICategory): Promise<void> {
    await prisma.category.delete({
      where: { id: category.id },
    });
  }
}
