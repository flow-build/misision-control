function healthCheckMiddlewre() {
  async function middleware(ctx) {
    ctx.body = 'flowbuild mission-control api';
    ctx.status = 200;
  }

  return middleware;
}

module.exports = healthCheckMiddlewre;
