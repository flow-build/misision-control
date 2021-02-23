// const { v4: uuid } = require('uuid');
const options = require('../../config');
const containerFactory = require('../../diConfiguration');

describe('user repository tests', () => {
  const userRepository = containerFactory(options)
    .resolve('userRepository');
  const id = 'c17bb272-e554-4037-b039-87340ebf2e0f';
  it('add new user', async (done) => {
    const user = {
      id,
      name: 'john doe',
      email: 'john.doe+test@gmail.com',
      password: '123456',
      created_at: new Date(),
    };
    const inserted = await userRepository.createUser(user);
    expect(inserted).not.toBe(undefined);
    await done();
  });

  it('get user by email', async (done) => {
    const user = await userRepository.getUserByEmail({
      email: 'john.doe+test@gmail.com',
    });
    expect(user.name).toBe('john doe');
    expect(user.email).toBe('john.doe+test@gmail.com');
    expect(user.encryptedPassword).toBe('123456');
    await done();
  });

  it('update user', async (done) => {
    const user = {
      id,
      password: '456789',
    };
    const updated = await userRepository.updateUser(user);
    expect(updated).not.toBe(undefined);
    await done();
  });

  it('get complete user by id', async (done) => {
    const user = await userRepository.getUserById({ id });
    expect(user.name).toBe('john doe');
    expect(user.email).toBe('john.doe+test@gmail.com');
    await done();
  });

  it('get Users', async (done) => {
    const users = await userRepository.getUsers();
    expect(users.length).toBeGreaterThan(0);
    await done();
  });

  it('disable', async (done) => {
    const disabled = await userRepository.disableUser({
      id,
    });
    expect(disabled).not.toBe(undefined);
    await done();
  });
});
