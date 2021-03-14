const uuid = require('uuid');
const crypto = require('crypto');

const {
  formatError: { formatErrorToController },
} = require('../exceptions');

function organizationController({
  loggerService: logger,
  organizationRepository: repo,
  organizationValidator: validator,
}) {
  async function getList(ctx, next) {
    try {
      const result = await repo.listOrganizations();

      ctx.body = result;
      ctx.status = 200;
      await next();
    } catch (err) {
      formatErrorToController(ctx, err, logger);
      logger.error('get organizations failed', err);
    }
  }

  async function getById(ctx, next) {
    try {
      const { organization_id: id } = ctx.params;

      const result = await repo.getOrganization({ id });

      ctx.body = result;
      ctx.status = 200;
      await next();
    } catch (err) {
      formatErrorToController(ctx, err, logger);
      logger.error('get workflows failed', err);
    }
  }

  async function getByName(ctx, next) {
    try {
      const requestDTO = ctx.request.body;
      validator.createOrganization(requestDTO);

      // add internal keys
      requestDTO.id = uuid.v4();
      const hash = crypto.randomBytes(48).toString('hex');
      requestDTO.secret_key = hash;
      const result = await repo.createOrganization(requestDTO);

      ctx.body = result;
      ctx.status = 200;
      await next();
    } catch (err) {
      formatErrorToController(ctx, err, logger);
      logger.error('get workflows failed', err);
    }
  }

  async function create(ctx, next) {
    try {
      const requestDTO = ctx.request.body;
      validator.createOrganization(requestDTO);
      requestDTO.id = uuid.v4();
      const hash = crypto.randomBytes(48).toString('hex');
      requestDTO.secret_key = hash;
      const result = await repo.createOrganization(requestDTO);

      ctx.body = result;
      ctx.status = 200;
      await next();
    } catch (err) {
      formatErrorToController(ctx, err, logger);
      logger.error('get workflows failed', err);
    }
  }

  async function updateById(ctx, next) {
    try {
      const { organization_id: id } = ctx.params;
      const requestDTO = ctx.request.body;
      validator.createOrganization(requestDTO);
      requestDTO.id = id;

      const result = await repo.updateOrganization(requestDTO);

      ctx.body = result;
      ctx.status = 200;
      await next();
    } catch (err) {
      formatErrorToController(ctx, err, logger);
      logger.error('get workflows failed', err);
    }
  }

  async function deleteById(ctx, next) {
    try {
      const { organization_id: id } = ctx.params;

      const result = await repo.disableOrganization({ id });

      ctx.body = result;
      ctx.status = 200;
      await next();
    } catch (err) {
      formatErrorToController(ctx, err, logger);
      logger.error('get workflows failed', err);
    }
  }

  return {
    getList,
    getById,
    getByName,
    create,
    updateById,
    deleteById,
  };
}

module.exports = organizationController;
