const axios = require('axios').default;

function delegateMiddlleware() {
  async function middleware(ctx) {
    const {
      method,
      realPath,
      token,
    } = ctx.state.request;
    let response;

    switch (method) {
      case 'GET': {
        response = await axios.get(realPath, {
          headers: {
            ...ctx.request.headers,
            Authorization: `Flowbuild Login=${token}`,
          },
        });
        break;
      }
      case 'POST': {
        response = await axios.post(realPath,
          ctx.request.body, {
            headers: {
              ...ctx.request.headers,
              Authorization: `Flowbuild Login=${token}`,
            },
          });
        break;
      }
      case 'PUT': {
        response = await axios.put(realPath,
          ctx.request.body, {
            headers: {
              ...ctx.request.headers,
              Authorization: `Flowbuild Login=${token}`,
            },
          });
        break;
      }
      case 'DELETE': {
        response = await axios.delete(realPath, {
          headers: {
            ...ctx.request.headers,
            Authorization: `Flowbuild Login=${token}`,
          },
        });
        break;
      }
      default:
        throw new Error('unmapped request method');
    }

    ctx.body = response.data;
    ctx.status = response.status;
  }

  return middleware;
}

module.exports = delegateMiddlleware;
