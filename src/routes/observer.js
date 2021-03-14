const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

function generateRouter(container) {
  const router = new Router();

  const authenticationMiddleware = container
  .resolve('authenticationMiddleware');
    const authorizationMiddlewareFactory = container
  .resolve('authorizationMiddleware');
  const getObserver = container
  .resolve('observerMiddleware');

  router.use(authenticationMiddleware,getObserver);

  return router;
}

module.exports = generateRouter;
