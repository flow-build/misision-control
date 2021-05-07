const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

function generateRouter(container) {
  const router = new Router();

  const healthCheckMiddleware = container
    .resolve('healthCheckMiddleware');

  router.get('/', healthCheckMiddleware)
  return router;
}

module.exports = generateRouter;
