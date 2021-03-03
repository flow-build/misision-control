function notAllowedMiddleware({
  loggerService: logger,
}) {
  function middleware() {
    logger.warning(
      'request in method not allowed',
    );

    const err = new Error('method not allowed');
    err.status = 405;
    err.code = 405;

    return err;
  }
  return middleware;
}

module.exports = notAllowedMiddleware;
