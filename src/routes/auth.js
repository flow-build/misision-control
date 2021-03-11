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
    groupController.getList)
    .post('/',
      authorizationMiddlewareFactory('group'),
      bodyParser(),
      groupController.create)
    .get('/:group_id',
      authorizationMiddlewareFactory('group'),
      groupController.getById)
    .put('/:group_id',
      authorizationMiddlewareFactory('group'),
      groupController.updateById)
    .delete('/:group_id',
      authorizationMiddlewareFactory('group'),
      groupController.deleteById);

  // user endpoints
  const userRouter = new Router({
    prefix: '/users',
  });
  userRouter.use(authenticationMiddleware);
  userRouter.get('/',
    authorizationMiddlewareFactory('user'),
    userController.getList)
    .get('/:user_id',
      authorizationMiddlewareFactory('user'),
      userController.getById)
    .post('/',
      authorizationMiddlewareFactory('user'),
      bodyParser(),
      userController.create)
    .put('/:user_id',
      authorizationMiddlewareFactory('user'),
      userController.updateById)
    .delete('/:user_id',
      authorizationMiddlewareFactory('user'),
      userController.deleteById);

  // role endpoints
  const roleRouter = new Router({
    prefix: '/groups',
  });
  roleRouter.use(authenticationMiddleware);
  roleRouter.get('/',
    authorizationMiddlewareFactory('role'),
    roleController.getList)
    .post('/',
      authorizationMiddlewareFactory('role'),
      bodyParser(),
      roleController.create)
    .get('/:role_id',
      authorizationMiddlewareFactory('role'),
      roleController.getById)
    .put('/:role_id',
      authorizationMiddlewareFactory('role'),
      roleController.updateById)
    .delete('/:role_id',
      authorizationMiddlewareFactory('role'),
      roleController.deleteById);

  router.use(userRouter.middleware());
  router.use(roleRouter.middleware());
  router.use(groupRouter.middleware());

  // authentication endpoints
  router.post('/login', userController.login)
    .post('/reset_password',
      authenticationMiddleware,
      userController.changePassword);

  return router;
}

module.exports = generateRouter;
