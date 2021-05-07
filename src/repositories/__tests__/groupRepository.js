const options = require('../../config');
const containerFactory = require('../../diConfiguration');

describe('group repository tests', () => {
  const groupRepository = containerFactory(options)
    .resolve('groupRepository');
  const id = 'c17bb272-e554-4037-b039-87340ebf2a4f';

  it('add new group', async (done) => {
    const group = await groupRepository.createGroup({
      id,
      name: 'test group',
    });
    expect(group).not.toBe(undefined);
    await done();
  });

  it('get group by id', async (done) => {
    const group = await groupRepository.getGroup({ id });
    expect(group.name).toBe('test group');
    expect(group.id).toBe(id);
    await done();
  });

  it('list groups', async (done) => {
    const groups = await groupRepository.listGroups();
    expect(groups.length).toBeGreaterThan(0);
    expect(groups[0].name).toBe('test group');
    expect(groups[0].id).toBe(id);
    await done();
  });

  it('update group', async (done) => {
    const updated = await groupRepository.updateGroup({
      id,
      name: 'updated group name test',
    });
    expect(updated).not.toBe(undefined);
    await done();
  });

  it('disable groups', async (done) => {
    const disabled = await groupRepository.disableGroup({ id });
    expect(disabled).not.toBe(undefined);
    await done();
  });
});
