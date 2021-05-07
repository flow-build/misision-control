function observerMiddleware({
  organizationRepository: repo,
}) {
  function getPath(ctx) {
    const { url, method } = ctx.request;
    const parts = url.split('/');
    if (parts[1] !== 'observer') {
      ctx.throw(400, 'invallid path to delegate to obserever');
    }
    const organizationName = parts[2];
    const endpoint = parts.slice(3).join('/');
    return {
      organizationName,
      endpoint,
      method,
    };
  }

  async function getOrganization(name) {
    const organization = await repo.getOrganizationByName({ name });

    return organization;
  }

  async function middleware(ctx, next) {
    const {
      organizationName,
      endpoint,
      method,
    } = getPath(ctx);

    const organization = await getOrganization(organizationName);

    const realPath = `${organization.url}/${endpoint}`;
    ctx.state.request = {
      realPath,
      method,
      token: organization.secretKey,
      organization: organizationName,
    };
    await next();
  }
  return middleware;
}

module.exports = observerMiddleware;
