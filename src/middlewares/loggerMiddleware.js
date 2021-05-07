function loggerMiddleware({
  loggerService: logger,
}) {
  async function middleware(ctx, next) {
    logger.info(
      `request ->  METHOD: ${ctx.request.method}, PATH:${ctx.request.path}`,
    );
    await next();
  }
  return middleware;
}

module.exports = loggerMiddleware;
