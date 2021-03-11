const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

function generateRouter(container) {
  const router = new Router({ prefix: '/organizations' });

  const authenticationMiddleware = container
    .resolve('authenticationMiddleware');
  const decryptTokenMiddleware = container
    .resolve('decryptTokenMiddleware');
  const authorizationMiddlewareFactory = container
    .resolve('authorizationMiddleware');
  const organizationController = container.resolve('organizationController');

  //   router.use(authenticationMiddleware);
  //   router.use(decryptTokenMiddleware);
  //   router.use(authorizationMiddlewareFactory);

  router.get('/', organizationController.listOrganizations)
    .post('/',
      bodyParser(),
      organizationController.createOrganization)
    .get('/:organization_id', organizationController.getOrganizationById)
    .put('/:organization_id',
      bodyParser(),
      organizationController.editOrganization)
    .delete('/:organization_id', organizationController.deleteOrganization);

  return router;
}

module.exports = generateRouter;
