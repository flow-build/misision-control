const { ValidationException } = require('../exceptions');
const validator = require('./base-validator');

function userValidator({
  loggerService: logger,
}) {
  function createUser(dto) {
    const validationError = validator({
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
      },
      required: ['name', 'email'],
      additionalProperties: false,
    }, dto);

    if (validationError) {
      logger.debug(`error on create user validation:
        ${JSON.stringify(validationError)}`);
      throw new ValidationException('create user',
        validationError.errors);
    }
  }
  function loginUser(dto) {
    const validationError = validator({
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
      required: ['password'],
      additionalProperties: false,
    }, dto);

    if (validationError) {
      logger.debug(`error on get activityManager by id validation:
        ${JSON.stringify(validationError)}`);
      throw new ValidationException('login user',
        validationError.errors);
    }
  }

  function changePassword(dto) {
    const validationError = validator({
      type: 'object',
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
        },
        password: {
          type: 'string',
        },
        currentPassword: {
          type: 'string',
        },
        confirmationPassword: {
          type: 'string',
        },
      },
      required: ['id', 'password', 'currentPassword', 'confirmationPassword'],
      additionalProperties: false,
    }, dto);

    if (validationError) {
      logger.debug(`error on get activityManager by id validation:
        ${JSON.stringify(validationError)}`);
      throw new ValidationException('change password',
        validationError.errors);
    }
  }

  return {
    createUser,
    loginUser,
    changePassword,
  };
}

module.exports = userValidator;
