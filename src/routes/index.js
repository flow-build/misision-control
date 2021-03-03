const authRouter = require('./auth');
function generateRoutes(container) {
  const auth = authRouter(container);
  return [auth];
}

module.exports = generateRoutes;
