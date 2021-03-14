const Koa = require('koa');
const cors = require('koa2-cors');
const http2Server = require('http2');
const routes = require('./routes');
const observer = require('./routes/observer')

function setBaseMiddlewares(app, container) {
  const corsOptions = {
    origin: '*',
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  };
  app.use(cors(corsOptions));
  app.use(container.resolve('loggerMiddleware'));
  app.use(container.resolve('errorMiddleware'));
}

function setRouters(app, container) {
  routes(container).forEach((router) => {
    app.use(router.routes());
    app.use(router.allowedMethods({
      throw: true,
      notImplemented: container.resolve('notImplementedMiddleware'),
      methodNotAllowed: container.resolve('notAllowedMiddleware'),
    }));
  });
}

/**
 *
 * @param {*} app
 * @param {*} container
 *
 * @returns {http2Server.Http2SecureServer | Koa} server
 */
function setupServerInstance(app, container) {
  const { http2Settings } = container.resolve('webOptions');

  if (http2Settings) {
    const server = http2Server.createSecureServer(
      http2Settings,
      app.callback(),
    );
    return server;
  }
  return app;
}

function setupDelegatorMiddlewares(container, app) {
  const authenticationMiddleware = container
    .resolve('authenticationMiddleware');

  const getObserver = container
    .resolve('observerMiddleware');
  app.use(authenticationMiddleware);
  app.use(getObserver);
  app.use(saveLogMiddleware);
  app.use(delegateMiddleware);
}

function setup(container) {
  const app = new Koa();

  app.on('error', (err) => {
    // eslint-disable-next-line no-console
    console.error('Server error!', err);
  });

  setBaseMiddlewares(app, container);
  setRouters(app, container);

  setupDelegatorMiddlewares(container, app);
  const server = setupServerInstance(app, container);

  return server;
}

module.exports = setup;

