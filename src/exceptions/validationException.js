class ValidationException extends Error {
  constructor(message, errors, error) {
    // eslint-disable-next-line max-len
    const customMessage = `error on validation: ${message}`;
    super(customMessage, error);
    this.code = 400;
    this.validation_errors = errors;
    this.type = 'validation';
  }
}

module.exports = ValidationException;
