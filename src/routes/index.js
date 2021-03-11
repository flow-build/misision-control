const authRouter = require('./auth');
const organizationRouter = require('./organization');

function generateRoutes(container) {
  const auth = authRouter(container);
  const organization = organizationRouter(container);
  return [auth, organization];
}

module.exports = generateRoutes;
