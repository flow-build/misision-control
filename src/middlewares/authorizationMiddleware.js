/* eslint-disable no-unused-vars */
const {
  AuthorizationException,
  formatError: {
    formatErrorToController,
  },
} = require('../exceptions');

function authorizationMiddleware({
  loggerService: logger,
  instanceOptions,
}) {
  const { missionControlSecretKey } = instanceOptions;
  function authorizationMiddlewareFactory(groupPolicy) {
    const policy = groupPolicy;
    async function middleware(ctx, next) {
      await next();
    }
    return middleware;
  }
  return authorizationMiddlewareFactory;
}

module.exports = authorizationMiddleware;
