const options = require('../../config');
const containerFactory = require('../../diConfiguration');

describe('role repository tests', () => {
  const roleRepository = containerFactory(options)
    .resolve('roleRepository');
  const id = 'c17bb272-e554-4037-b039-87340ebf2a3f';

  it('add new role', async (done) => {
    const role = await roleRepository.createRole({
      id,
      name: 'test role',
    });
    expect(role).not.toBe(undefined);
    await done();
  });

  it('get role by id', async (done) => {
    const role = await roleRepository.getRole({ id });
    expect(role.name).toBe('test role');
    expect(role.id).toBe(id);
    await done();
  });

  it('list roles', async (done) => {
    const roles = await roleRepository.listRoles();
    expect(roles.length).toBeGreaterThan(0);
    expect(roles[0].name).toBe('test role');
    expect(roles[0].id).toBe(id);
    await done();
  });

  it('update role', async (done) => {
    const updated = await roleRepository.updateRole({
      id,
      name: 'updated role name test',
    });
    expect(updated).not.toBe(undefined);
    await done();
  });

  it('disable roles', async (done) => {
    const disabled = await roleRepository.disableRole({ id });
    expect(disabled).not.toBe(undefined);
    await done();
  });
});
