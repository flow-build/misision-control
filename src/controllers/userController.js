const {
  formatError: {
    formatErrorToController,
  },
} = require('../exceptions');

function userController({
  authService,
  loggerService: logger,
  userRepository: repo,
  userValidator: validator,
}) {
  async function getList(ctx) {
    try {
      const result = await repo.getUsers();

      ctx.body = result;
      ctx.status = 200;
    } catch (err) {
      formatErrorToController(ctx, err, logger);
      logger.error('get users failed', err);
    }
  }

  async function getById(ctx, next) {
    try {
      const { user_id: id } = ctx.params;

      const result = await repo.getUserById({ id });
      result.encryptedPassword = undefined;

      ctx.body = result;
      ctx.status = 200;
      await next();
    } catch (err) {
      formatErrorToController(ctx, err, logger);
      logger.error('get user by id failed', err);
    }
  }
  async function create(ctx) {
    try {
      const requestDTO = ctx.request.body;
      validator.createUser(requestDTO);

      const result = await authService.createUser(requestDTO);

      ctx.body = result;
      ctx.status = 201;
    } catch (err) {
      formatErrorToController(ctx, err, logger);
      logger.error('create user failed', err);
    }
  }

  async function updateById(ctx) {
    try {
      const { user_id: id } = ctx.params;
      const requestDTO = ctx.request.body;

      requestDTO.id = id;

      const result = await repo.updateUser(requestDTO);

      ctx.body = result;
      ctx.status = 200;
    } catch (err) {
      formatErrorToController(ctx, err, logger);
      logger.error('update user failed', err);
    }
  }

  async function deleteById(ctx) {
    try {
      const { user_id: id } = ctx.params;

      const result = await repo.disableUser({ id });

      ctx.body = result;
      ctx.status = 200;
    } catch (err) {
      formatErrorToController(ctx, err, logger);
      logger.error('delete user failed', err);
    }
  }

  async function login(ctx) {
    try {
      const { body: requestDTO } = ctx.request;

      validator.loginUser(requestDTO);
      const token = await authService.loginUser(requestDTO);

      ctx.body = { token };
      ctx.status = 201;
    } catch (err) {
      formatErrorToController(ctx, err, logger);
      logger.error('delete user failed', err);
    }
  }

  async function changePassword(ctx) {
    try {
      const { body: requestDTO } = ctx.request;
      requestDTO.id = ctx.state.user.id;
      validator.changePassword(requestDTO);
      const result = await authService.changePassword(requestDTO);

      ctx.body = result;
      ctx.status = 201;
    } catch (err) {
      formatErrorToController(ctx, err, logger);
      logger.error('delete user failed', err);
    }
  }

  return {
    getList,
    getById,
    create,
    updateById,
    deleteById,
    login,
    changePassword,
  };
}

module.exports = userController;
