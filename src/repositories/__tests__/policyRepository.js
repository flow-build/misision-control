// const { v4: uuid } = require('uuid');
const options = require('../../config');
const containerFactory = require('../../diConfiguration');

describe('user repository tests', () => {
  const policyRepository = containerFactory(options)
    .resolve('policyRepository');
  const roleRepository = containerFactory(options)
    .resolve('roleRepository');
  const id = 'c17bb272-e554-4037-b039-87340ebf2ccf';
  const roleId = 'c17bb272-e554-4037-b039-87340ebf2acf';

  /**
    table.uuid('id').primary();
    table.string('name', 255).notNull();
    table.string('description', 512);
    table.timestamp('created_at').notNullable();
    table.timestamp('updated_at').notNullable();
    table.timestamp('disabled_at');
   */
  it('add new policy', async (done) => {
    await roleRepository.createRole({
      id: roleId,
      name: 'test role 2',
      description: 'test role',
      created_at: new Date(),
    });
    const policy = {
      id,
      name: 'test policy 2',
      description: 'test policy',
      created_at: new Date(),
    };
    const inserted = await policyRepository.createPolicy(policy, roleId);
    expect(inserted).not.toBe(undefined);
    await done();
  });

  it('get policy by id', async (done) => {
    const user = await policyRepository.getUserByEmail({
      email: 'john.doe+test@gmail.com',
    });
    expect(user.name).toBe('john doe');
    expect(user.email).toBe('john.doe+test@gmail.com');
    expect(user.encryptedPassword).toBe('123456');
    await done();
  });

  it('update policy', async (done) => {
    const user = {
      id,
      password: '456789',
    };
    const updated = await policyRepository.updateUser(user);
    expect(updated).not.toBe(undefined);
    await done();
  });

  it('get policies', async (done) => {
    const users = await policyRepository.getUsers();
    expect(users.length).toBeGreaterThan(0);
    await done();
  });

  it('disable', async (done) => {
    const disabled = await policyRepository.disableUser({
      id,
    });
    expect(disabled).not.toBe(undefined);
    await done();
  });
});
