const Ajv = require('ajv');

function baseValidator(schema, dto) {
  const ajv = new Ajv();

  const validator = ajv.compile(schema);
  if (!validator(dto)) {
    return {
      code: 400,
      errors: validator.errors,
      message: 'parameters validation error',
    };
  }
  return undefined;
}

module.exports = baseValidator;
