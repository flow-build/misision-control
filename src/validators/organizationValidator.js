const { ValidationException } = require('../exceptions');
const validator = require('./base-validator');

function organizationValidator({
  loggerService: logger,
}) {
  function createOrganization(dto) {
    const validationError = validator({
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        url: { type: 'string' },
      },
      required: ['name', 'url'],
      additionalProperties: false,
    }, dto);

    if (validationError) {
      logger.debug(`error on insert Organization validation:
        ${JSON.stringify(validationError)}`);
      throw new ValidationException('post organization',
        validationError.errors);
    }
  }

  return {
    createOrganization,
  };
}

module.exports = organizationValidator;
