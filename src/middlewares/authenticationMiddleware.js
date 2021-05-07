const { AuthenticationException } = require('../exceptions');

function authenticationMiddleware({
  authService,
}) {
  async function middleware(ctx, next) {
    const { authorization } = ctx.request.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new AuthenticationException('invalid authorization Token');
    }
    const token = authorization.split(' ')[1];
    const user = await authService.authenticateUser(token);
    ctx.state.user = user;
    await next();
  }
  return middleware;
}

module.exports = authenticationMiddleware;
