const {
  DependencyNotFoundException,
  DatabaseException,
} = require('../exceptions');

function groupRepository({
  instanceService,
  loggerService: logger,
}) {
  if (!instanceService) {
    throw new DependencyNotFoundException('instance Service');
  }
  if (!logger) {
    throw new DependencyNotFoundException('logger Service');
  }

  const { db } = instanceService;

  async function listGroups() {
    try {
      const groups = await db.select({
        name: 'name',
        id: 'id',
        description: 'description',
        created_at: 'created_at',
        updated_at: 'updated_at',
      }).from('group')
        .whereNull('disabled_at');
      if (groups) {
        return groups;
      }
      throw new DatabaseException('groups not exist or disabled');
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('get groups failed');
    }
  }

  async function getGroup({ id }) {
    try {
      const completeGroup = await db.transaction(async (trx) => {
        const group = await trx.select({
          id: 'id',
          name: 'name',
          description: 'description',
          create_at: 'created_at',
          updated_at: 'updated_at',
        }).from('group')
          .whereNull('disabled_at')
          .andWhere('id', '=', id)
          .first();

        const users = await trx.select({
          id: 'user.id',
          name: 'user.name',
          email: 'user.email',
        }).from('user')
          .leftJoin('user_x_group', 'user_x_group.user_id', 'user.id')
          .where('user_x_group.group_id', '=', id);

        const roles = await trx.select({
          id: 'role.id',
          name: 'role.name',
          description: 'role.description',
        }).from('role')
          .leftJoin('group_x_role', 'group_x_role.role_id', 'user.id')
          .where('group_x_role.group_id', '=', id);

        group.users = users;
        group.roles = roles;
        return group;
      });
      if (completeGroup) {
        return completeGroup;
      }
      throw new DatabaseException(
        `group with id: ${id} dont exist or disabled`,
      );
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('get group by id');
    }
  }

  async function createGroup(group) {
    try {
      const inserted = await db('group').insert({
        ...group,
        created_at: new Date(),
        updated_at: new Date(),
      });
      if (inserted) {
        return inserted;
      }
      throw new DatabaseException('failed to insert group');
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('unexpected error on inser group');
    }
  }

  async function updateGroup(group) {
    try {
      const { id, ...updateData } = group;
      const updated = await db('group')
        .where({ id })
        .update({
          ...updateData,
          updated_at: new Date(),
        });

      if (updated) {
        return updated;
      }
      throw new DatabaseException('failed to update group');
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('update group');
    }
  }

  async function disableGroup({ id }) {
    try {
      const disabled = await db('group')
        .where({
          id,
        })
        .update({
          disabled_at: new Date(),
          updated_at: new Date(),
        });

      if (disabled) {
        return disabled;
      }
      throw new DatabaseException('failed to disable group');
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('disable group');
    }
  }

  return {
    listGroups,
    getGroup,
    createGroup,
    updateGroup,
    disableGroup,
  };
}

module.exports = groupRepository;
