/* eslint-disable max-len */
/* eslint-disable no-console */
function getCallerFile(err) {
  try {
    const error = err || new Error();

    Error.prepareStackTrace = (_, stack) => stack;

    const currentfile = error.stack.shift().getFileName();
    let callerfile;
    while (error.stack.length) {
      callerfile = error.stack.shift().getFileName();

      if (currentfile !== callerfile) {
        return `${callerfile}:${error.stack.shift().getLineNumber()}:${error.stack.shift().getColumnNumber()}`;
      }
    }
  } catch (error) {
    console.error(error);
  }
  return undefined;
}

class LoggerService {
  constructor({ loggerOptions }) {
    if (loggerOptions.logLevel) {
      this.logLevel = loggerOptions.logLevel;
    } else throw new Error('loggerOptions not Setted');

    this._week = this.logLevel === 'DEBUG'
      ? (text) => console.log(text)
      : () => {};
  }

  // eslint-disable-next-line class-methods-use-this
  formater(level, text) {
    return `[${new Date().toISOString()}] - [${level}]`
        + ` - [${getCallerFile()}] - [MESSAGE -> ${text}]`;
  }

  debug(text) {
    this._week(this.formater('DEBUG', text));
  }

  info(text) {
    console.log(this.formater('INFO', text));
  }

  warning(text) {
    console.warn(this.formater('WARNING', text));
  }

  error(message, err) {
    console.group();
    console.log(this.formater('ERROR', message || err.message));
    console.error(err);
    console.log('------------ERROR-------------');
    console.groupEnd();
  }
}

module.exports = LoggerService;
