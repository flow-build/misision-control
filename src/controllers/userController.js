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

  async function listUsers(ctx, next) {
    try {
      const users = await repo.getUsers();
      ctx.body = users;
      ctx.status = 200;
    } catch (err) {
      formatError.formatErrorToController(ctx, err, logger);
    }
  }

  async function getUserById(ctx, next) {

  }
  async function createUser(ctx, next) {

  }

  async function editUser(ctx, next) {

  }

  async function deleteUser(ctx, next) {

  }

  async function loginUser(ctx, next) {
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
    listUsers,
    getUserById,
    createUser,
    editUser,
    deleteUser,
    loginUser,
    changePassword,
  };
}

module.exports = userController;
