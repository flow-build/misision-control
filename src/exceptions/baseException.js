class BaseError extends Error {
  constructor(message, error) {
    super(message);
    this.code = 400;
    this.type = 'BaseError';
    this.message = message || error.message;
    this.error = error;
  }
}

module.exports = BaseError;
