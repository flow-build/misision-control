const BaseException = require('./baseException');

class NotImplementedException extends BaseException {
  constructor() {
    const message = 'request method not implemented';
    super(message, undefined);

    this.type = 'not implemented';
    this.code = 501;
  }
}

module.exports = NotImplementedException;
