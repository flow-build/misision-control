function userController({
  authService,
  loggerService: logger,
  userRepository: repo,
}) {
  async function listUsers(ctx, next) {

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
