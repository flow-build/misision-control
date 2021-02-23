const BaseException = require('./baseException');

class DatabaseException extends BaseException {
  constructor(message, error) {
    // eslint-disable-next-line max-len
    const customMessage = `database base connection error on method: ${message}`;
    super(customMessage, error);
    this.code = 400;
    this.type = 'database';
  }
}

module.exports = DatabaseException;
