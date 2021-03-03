function notImplementedMiddleware({
  loggerService: logger,
}) {
  async function middleware(ctx) {
    const message = 'request method not implemented';
    logger.warning(
      message,
    );
    ctx.body = {
      error: {
        message,
        code: 501,
      },
    };
    ctx.status = 501;
  }
  return middleware;
}

module.exports = notImplementedMiddleware;
