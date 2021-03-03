const {
  formatError: {
    formatErrorToController,
  },
} = require('../exceptions');

function errorMiddleware({
  loggerService: logger,
}) {
  async function middleware(ctx, next) {
    try {
      await next();
    } catch (err) {
      const msg = `some unexpected error ocurred, [ERROR-MSG -> ${err.message}]`
    + `[REQUEST ->  METHOD: ${ctx.request.method}, PATH:${ctx.request.path}]`;
      logger.warning(msg);
      formatErrorToController(ctx, err, logger);
    }
  }
  return middleware;
}

module.exports = errorMiddleware;
