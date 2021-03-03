function decryptTokenMiddleware({ cryptoService }) {
  async function decryptToken(ctx, next) {
    const actor = ctx.state.user;

    const decryptedPayload = cryptoService.decryptPayload(actor.payload);

    ctx.state.user = decryptedPayload;
    await next();
  }
  return decryptToken;
}

module.exports = decryptTokenMiddleware;
