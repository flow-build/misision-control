const {
  DependencyNotFoundException,
  DatabaseException,
} = require('../exceptions');

function userRepository({
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

  async function getUsers() {
    try {
      const user = await db.select({
        email: 'email',
        name: 'name',
        id: 'id',
      }).from('user')
        .whereNull('disabled_at');
      if (user) {
        return user;
      }
      throw new DatabaseException('user not exist or disabled');
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('get users failed');
    }
  }

  async function getUserById({ id }) {
    try {
      const completeUser = await db.transaction(async (trx) => {
        const user = await trx.select({
          id: 'user.id',
          email: 'user.email',
          name: 'user.name',
          'groups.name': 'group.name',
          'groups.id': 'group.id',
          'roles.name': 'role.name',
          'roles.id': 'role.id',
        }).from('user')
          .leftJoin('user_x_group', 'user.id', 'user_x_group.user_id')
          .leftJoin('user_x_role', 'user.id', 'user_x_role.user_id')
          .leftJoin('group', 'user_x_group.group_id', 'group.id')
          .leftJoin('group_x_role', 'group.id', 'group_x_role.group_id')
          .leftJoin('role', (builder) => {
            builder.on('role.id', '=', 'user_x_role.role_id')
              .orOn('role.id', '=', 'group_x_role.role_id');
          })
          .where('user.id', '=', id)
          .first();

        if (user.roles && user.roles.length > 0) {
          const roleIds = user.roles.map((role) => role.id);
          const policies = await trx.select({
            id: 'policy.id',
            name: 'policy.name',
            type: 'role_x_policy.type',
          })
            .from('policy')
            .leftJoin('role_x_policy',
              'policy.id',
              'role_x_policy.policy_id')
            .where((builder) => builder.whereIn(
              'role_x_policy.role_id', roleIds,
            ));
          user.policies = policies;
        }

        return user;
      });

      return completeUser;
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('get completed user');
    }
  }

  async function getUserByEmail({ email }) {
    try {
      const user = await db.select({
        email: 'email',
        name: 'name',
        encryptedPassword: 'password',
        id: 'id',
      }).from('user')
        .whereNull('disabled_at')
        .andWhere('email', '=', email)
        .first();
      if (user) {
        return user;
      }
      throw new DatabaseException('user not exist or disabled');
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('get user by email');
    }
  }

  async function createUser(user) {
    try {
      const inserted = await db('user').insert({
        ...user,
        created_at: new Date(),
        updated_at: new Date(),
      });
      if (inserted) {
        return inserted;
      }
      throw new DatabaseException('failed to insert user');
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('get user by email');
    }
  }

  async function updateUser(user) {
    try {
      const { id, ...updateData } = user;
      const updated = await db('user')
        .where({ id })
        .update({
          ...updateData,
          updated_at: new Date(),
        });

      if (updated) {
        return updated;
      }
      throw new DatabaseException('failed to update user');
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('update User');
    }
  }

  async function disableUser({ id }) {
    try {
      const disabled = await db('user')
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
      throw new DatabaseException('failed to disable user');
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('disable User');
    }
  }

  return {
    getUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    disableUser,
  };
}

module.exports = userRepository;
