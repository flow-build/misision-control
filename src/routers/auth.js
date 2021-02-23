const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const jwt = require('koa-jwt');

function generateRouter(container) {
  const router = new Router();

  const decryptTokenMiddleware = container.resolve('decryptTokenMiddleware');
  const authenticationMiddleware = container.resolve('authenticationMiddleware');
  const authorizationMiddlewareFactorty = container.resolve('authorizationMiddleware');
  const notImplementedMiddleware = container
    .resolve('notImplementedMiddleware');

  const groupController = container.resolve('containerController');
  const userController = container.resolve('roleController');
  const roleController = container.resolve('userController');

  // group endpoints
  router.get('/groups')
    .get('/groups/:group_id')
    .post('/groups')
    .put('/groups')
    .delete('/groups');

  // user endpoints
  router.get('/users')
    .get('/users/:user_id')
    .post('/users')
    .put('/users')
    .delete('/users');

  // role endpoints
  router.get('/roles')
    .get('/roles/:role_id')
    .post('/roles')
    .put('/roles')
    .delete('/roles');

  // authentication endpoints
  router.post('/login')
    .post('/reset_password');
}

module.exports = generateRouter;
