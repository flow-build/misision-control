const {
  DependencyNotFoundException,
  DatabaseException,
} = require('../exceptions');

function roleRepository({
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

  async function listRoles() {
    try {
      const roles = await db.select({
        name: 'name',
        id: 'id',
        description: 'description',
      }).from('role')
        .whereNull('disabled_at');
      if (roles) {
        return roles;
      }
      throw new DatabaseException('roles not exist or disabled');
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('get roles failed');
    }
  }

  async function getRole({ id }) {
    try {
      const completeRole = await db.transaction(async (trx) => {
        const role = await trx.select({
          id: 'id',
          name: 'name',
          create_at: 'created_at',
          updated_at: 'updated_at',
          description: 'description',
        }).from('role')
          .whereNull('disabled_at')
          .andWhere('id', '=', id)
          .first();

        if (role) {
          const policies = await trx.select({
            id: 'policy.id',
            name: 'policy.name',
            type: 'role_x_policy.permission_type',
          })
            .from('policy')
            .leftJoin('role_x_policy',
              'policy.id',
              'role_x_policy.policy_id')
            .where('role_x_policy.role_id', '=', id);
          role.policies = policies;
        }
        return role;
      });
      if (completeRole) {
        return completeRole;
      }
      throw new DatabaseException(`role with id: ${id} dont exist or disabled`);
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('get role by id');
    }
  }

  async function createRole(role) {
    try {
      const inserted = await db('role').insert({
        ...role,
        created_at: new Date(),
        updated_at: new Date(),
      });
      if (inserted) {
        return inserted;
      }
      throw new DatabaseException('failed to insert role');
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('insert role');
    }
  }

  async function updateRole(role) {
    try {
      const { id, ...updateData } = role;
      const updated = await db('role')
        .where({ id })
        .update({
          ...updateData,
          updated_at: new Date(),
        });

      if (updated) {
        return updated;
      }
      throw new DatabaseException('failed to update role');
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('update role');
    }
  }

  async function disableRole({ id }) {
    try {
      const disabled = await db('role')
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
      throw new DatabaseException('failed to disable role');
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('disable role');
    }
  }

  return {
    listRoles,
    getRole,
    createRole,
    updateRole,
    disableRole,
  };
}

module.exports = roleRepository;
