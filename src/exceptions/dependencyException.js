const BaseException = require('./baseException');

class DependencyNotFoundException extends BaseException {
  constructor(message, error) {
    super(message, error);
    this.type = 'dependency';
  }
}

module.exports = DependencyNotFoundException;
