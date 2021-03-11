const jwt = require('jsonwebtoken');
const {
  formatError,
} = require('../exceptions');

function userController({
  authService,
  loggerService: logger,
  userRepository: repo,
  webOptions,
}) {
  const { jwtSecret } = webOptions;

  async function getList(ctx, next) {
    try {
      const users = await repo.getUsers();
      ctx.body = users;
      ctx.status = 200;
    } catch (err) {
      formatError.formatErrorToController(ctx, err, logger);
    }
  }

  async function getById(ctx, next) {

  }
  async function create(ctx, next) {

  }

  async function updateById(ctx, next) {

  }

  async function deleteById(ctx, next) {

  }

  async function login(ctx, next) {
    const token = jwt.sign({
      actor_id: 123,
      claims: [],
    }, jwtSecret, { expiresIn: '3h' });
    ctx.body = {
      token,
    };
    ctx.status = 200;
  }

  async function changePassword(ctx, next) {

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
