import { prisma } from '../../../../prisma';
import { UserRepository } from '../../infra/prisma/repositories/UserRepository';
import { IUserRepository } from '../../repositories/IUserRepository';

describe('User repository test', () => {
  let userRepository: IUserRepository;

  beforeAll(async () => {
    userRepository = new UserRepository();
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  it('Should be able to create a user', async () => {
    const name = 'test';
    const email = 'test@test';
    const password = '1234';

    const user = await userRepository.create({ name, email, password });

    expect(user).toHaveProperty('id');
    expect(user?.name).toEqual(name);
  });

  it('Should be able to delete user', async () => {
    const name = 'test 1';
    const email = 'test1@test';
    const password = '1234';

    const user = await userRepository.create({ name, email, password });

    await userRepository.delete(user);

    const foundUser = await userRepository.findById(user.id);

    expect(foundUser).toBeNull();
  });

  it('Should be able to update user', async () => {
    const name = 'test 2';
    const email = 'test2@test';
    const password = '1234';

    const user = await userRepository.create({ name, email, password });

    user.name = 'test update 2';

    const updateUser = await userRepository.update(user);

    expect(updateUser?.name).toEqual('test update 2');
  });

  it('Should be able to find by ID', async () => {
    const name = 'test 1';
    const email = 'test1@test';
    const password = '1234';

    const user = await userRepository.create({ name, email, password });

    const foundUser = await userRepository.findById(user.id);

    expect(foundUser?.id).toEqual(user.id);
  });
});
