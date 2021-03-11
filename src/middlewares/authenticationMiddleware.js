const jwt = require('jsonwebtoken');
const {
  AuthorizationException,
  formatError: {
    formatErrorToController,
  },
} = require('../exceptions');

function authenticationMiddleware({
  loggerService: logger,
  webOptions,
}) {
  const { jwtSecret } = webOptions;
  async function middleware(ctx, next) {
    const { authorization } = ctx.request.headers;
    const token = authorization.split(' ')[1];
    try {
      jwt.verify(token, jwtSecret);
      const auth = jwt.decode(token, jwtSecret);
      ctx.state.user = auth;
      await next();
    } catch (err) {
      const customErr = new AuthorizationException(err);
      formatErrorToController(ctx, customErr, logger);
    }
  }
  return middleware;
}

module.exports = authenticationMiddleware;
