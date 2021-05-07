function historyMiddlleware({
  historyRepository: repo,
}) {
  async function middleware(ctx, next) {
    const currentState = ctx.state;
    try {
      await next();
      await repo.createHistory({
        ...currentState,
        response: {
          data: ctx.body,
          status: ctx.status,
        },
      });
    } catch (err) {
      await repo.createHistory({
        ...currentState,
        error: err.response.data,
      });
      ctx.status = err.response.status;
      ctx.body = err.response.data;
    }
  }

  return middleware;
}

module.exports = historyMiddlleware;
