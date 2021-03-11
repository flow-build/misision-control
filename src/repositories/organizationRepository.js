const {
  DependencyNotFoundException,
  DatabaseException,
} = require('../exceptions');

function organizationRepository({
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

  async function listOrganizations() {
    try {
      const organizations = await db.select({
        name: 'name',
        id: 'id',
      }).from('organization')
        .whereNull('disabled_at');
      if (organizations) {
        return organizations;
      }
      throw new DatabaseException('any organizations exist or is disabled');
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('get organizations failed');
    }
  }

  async function getOrganization({ id }) {
    try {
      const organizations = await db.select({
        name: 'name',
        id: 'id',
        url: 'url',
        secretKey: 'secret_key',
      }).from('organization')
        .whereNull('disabled_at')
        .andWhere('id', '=', id)
        .first();
      if (organizations) {
        return organizations;
      }
      throw new DatabaseException("Organization don't exist or is disabled");
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('get organization by id failed');
    }
  }

  async function createOrganization(organization) {
    try {
      const dateTime = new Date();
      const inserted = await db('organization').insert({
        ...organization,
        created_at: dateTime,
        updated_at: dateTime,
      });
      if (inserted) {
        return inserted;
      }
      throw new DatabaseException('failed to insert organization');
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('failed to insert organization');
    }
  }

  async function updateOrganization(organization) {
    try {
      const { id, ...updateData } = organization;
      const updated = await db('organization')
        .where({ id })
        .update({
          ...updateData,
          updated_at: new Date(),
        });

      if (updated) {
        return updated;
      }
      throw new DatabaseException('failed to update organization');
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('update organization');
    }
  }

  async function disableOrganization({ id }) {
    try {
      const dateTime = new Date();
      const disabled = await db('organization')
        .where({
          id,
        })
        .update({
          disabled_at: dateTime,
          updated_at: dateTime,
        });

      if (disabled) {
        return disabled;
      }
      throw new DatabaseException('failed to disable organization');
    } catch (err) {
      logger.error(err);
      throw new DatabaseException('disable organization');
    }
  }

  return {
    listOrganizations,
    getOrganization,
    createOrganization,
    updateOrganization,
    disableOrganization,
  };
}

module.exports = organizationRepository;
