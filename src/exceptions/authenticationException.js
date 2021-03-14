const BaseException = require('./baseException');

class AuthenticationException extends BaseException {
  constructor(message, error) {
    // eslint-disable-next-line max-len
    const customMessage = `error on Authentication: ${message}`;
    super(customMessage, error);
    this.code = 401;
    this.type = 'Authentication';
  }
}

module.exports = AuthenticationException;
