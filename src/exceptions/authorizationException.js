const BaseException = require('./baseException');

class AuthorizationException extends BaseException {
  constructor(message, error) {
    // eslint-disable-next-line max-len
    const customMessage = `error on Authorization: ${message}`;
    super(customMessage, error);
    this.code = 401;
    this.type = 'Authorization';
  }
}

module.exports = AuthorizationException;
