function authenticationMiddleware({
  authService,
}) {
  async function middleware(ctx, next) {
    const { authorization } = ctx.request.headers;
    const token = authorization.split(' ')[1];
    const user = await authService.authenticateUser(token);
    ctx.state.user = user;
    await next();
  }
  return middleware;
}

module.exports = authenticationMiddleware;
