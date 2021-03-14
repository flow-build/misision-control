const authRouter = require('./auth');
const organizationRouter = require('./organization');
const healthCheckRouter = require('./healthcheck');
// const observerRouter = require('./observer');

function generateRoutes(container) {
  const healthCheck = healthCheckRouter(container);
  const auth = authRouter(container);
  const organization = organizationRouter(container);
  // const obserrver = observerRouter(container);
  return [healthCheck, auth, organization];
}

module.exports = generateRoutes;
