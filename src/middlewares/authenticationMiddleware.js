const {
    AuthorizationException,
    formatError: {
      formatErrorToController,
    },
  } = require('../exceptions');
  
  function authorizationMiddleware({
    loggerService: logger,
    authService,
  }) {
    async function middleware(ctx, next) {
      const { authorization } = ctx.request.headers;
  
      const key = authorization.split('=')[1];
      if (key !== missionControlSecretKey) {
        const err = new AuthorizationException('invalid secret key on headers');
        formatErrorToController(ctx, err, logger);
      } else {
        await next();
      }
    }
    return middleware;
  }
  
  module.exports = authorizationMiddleware;
  