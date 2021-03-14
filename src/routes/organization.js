const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

function generateRouter(container) {
  const router = new Router({ prefix: '/organizations' });

  const authenticationMiddleware = container
    .resolve('authenticationMiddleware');
  const authorizationMiddlewareFactory = container
    .resolve('authorizationMiddleware');
  const organizationController = container.resolve('organizationController');

  router.use(authenticationMiddleware);
  router.use(authorizationMiddlewareFactory('organization'));

  router.get('/', organizationController.getList)
    .post('/',
      bodyParser(),
      organizationController.create)
    .get('/:organization_id', organizationController.getById)
    .put('/:organization_id',
      bodyParser(),
      organizationController.updateById)
    .delete('/:organization_id', organizationController.deleteById);

  return router;
}

module.exports = generateRouter;
