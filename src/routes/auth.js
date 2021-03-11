const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

function generateRouter(container) {
  const router = new Router({ prefix: '/auth' });
  const authenticationMiddleware = container
    .resolve('authenticationMiddleware');
  const decryptTokenMiddleware = container
    .resolve('decryptTokenMiddleware');
  const authorizationMiddlewareFactory = container
    .resolve('authorizationMiddleware');

  const groupController = container.resolve('groupController');
  const userController = container.resolve('userController');
  const roleController = container.resolve('roleController');

  // group endpoints
  const groupRouter = new Router({
    prefix: '/groups',
  });
  groupRouter.use(authenticationMiddleware);
  groupRouter.use(decryptTokenMiddleware);
  groupRouter.get('/',
    authorizationMiddlewareFactory('group'),
    groupController.listGroups)
    .post('/',
      authorizationMiddlewareFactory('group'),
      bodyParser(),
      groupController.createGroup)
    .get('/:group_id',
      authorizationMiddlewareFactory('group'),
      groupController.getGroupById)
    .put('/:group_id',
      authorizationMiddlewareFactory('group'),
      groupController.editGroup)
    .delete('/:group_id',
      authorizationMiddlewareFactory('group'),
      groupController.deleteGroup);

  // user endpoints
  const userRouter = new Router({
    prefix: '/users',
  });
  userRouter.use(authenticationMiddleware);
  userRouter.get('/',
    authorizationMiddlewareFactory('user'),
    userController.listUsers)
    .get('/:user_id',
      authorizationMiddlewareFactory('user'),
      userController.getUserById)
    .post('/',
      authorizationMiddlewareFactory('user'),
      bodyParser(),
      userController.createUser)
    .put('/:user_id',
      authorizationMiddlewareFactory('user'),
      userController.editUser)
    .delete('/:user_id',
      authorizationMiddlewareFactory('user'),
      userController.deleteUser);

  // role endpoints
  const roleRouter = new Router({
    prefix: '/groups',
  });
  roleRouter.use(authenticationMiddleware);
  roleRouter.get('/',
    authorizationMiddlewareFactory('role'),
    roleController.listRoles)
    .post('/',
      authorizationMiddlewareFactory('role'),
      bodyParser(),
      roleController.createRole)
    .get('/:role_id',
      authorizationMiddlewareFactory('role'),
      roleController.getRoleById)
    .put('/:role_id',
      authorizationMiddlewareFactory('role'),
      roleController.editRole)
    .delete('/:role_id',
      authorizationMiddlewareFactory('role'),
      roleController.deleteRole);

  router.use(userRouter.middleware());
  router.use(roleRouter.middleware());
  router.use(groupRouter.middleware());

  // authentication endpoints
  router.post('/login', userController.loginUser)
    .post('/reset_password',
      authenticationMiddleware,
      userController.changePassword);

  return router;
}

module.exports = generateRouter;
