const { ValidationException } = require('../exceptions');
const validator = require('./base-validator');

function authValidator({
  loggerService: logger,
}) {
  function getActivities(dto) {
    const validationError = validator({
      type: 'object',
      properties: {
        actorId: {
          type: 'string',
          format: 'uuid',
        },
        status: { type: 'string' },
      },
      required: ['actorId'],
      additionalProperties: false,
    }, dto);

    if (validationError) {
      logger.debug(`error on get activityManagers validation:
        ${JSON.stringify(validationError)}`);
      throw new ValidationException('get Activities',
        validationError.errors);
    }
  }
  function getActivityManagerById(dto) {
    const validationError = validator({
      type: 'object',
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
        },
      },
      required: ['id'],
      additionalProperties: false,
    }, dto);

    if (validationError) {
      logger.debug(`error on get activityManager by id validation:
        ${JSON.stringify(validationError)}`);
      throw new ValidationException('get Activity By Id',
        validationError.errors);
    }
  }

  return {
    getActivities,
    getActivityManagerById,
  };
}

module.exports = authValidator;
