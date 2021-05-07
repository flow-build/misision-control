// eslint-disable-next-line no-unused-vars
const Knex = require('knex');
// eslint-disable-next-line no-unused-vars
const http2Server = require('http2');

const setupDependencyInjection = require('./diConfiguration');
const setupWebConfiguration = require('./webConfiguration');

const defaultInstanceOptions = () => ({
  engineCryptoKey: undefined,
  databaseConnectionString: undefined,
  persistMode: 'knex',
});

const defaultLoggerOptions = () => ({
  logLevel: 'DEBUG',
});

const defaultFeatureFlags = () => ({
  activityManagerCacheable: true,
  processCacheable: false,
  nestedEndpoints: true,
});

const defaultWebOptions = () => ({
  jwtSecret: '1234',
  port: 3000,
  http2Settings: undefined,
});

const defaultCryptoOptions = () => ({
  cryptoKey: undefined,
  cryptoIV: undefined,
});

const defaultStartCallback = () => ((err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error('start server failed', err);
    process.exit(1);
  }
  // eslint-disable-next-line no-console
  console.log('flowbuild cockpit start sucessfully');
});

/**
 * @typedef {Object} cryptoOptionsDTO
 * @property {string} cryptoIV
 * @property {string} cryptoKey
 */

/**
 * @typedef {Object} loggerOptionsDTO
 * @property {string} logLevel
 */

/**
 * @typedef {Object} instanceOptionsDTO
 *
 * @property {'memory' | 'knex'} persistMode
 * @property {String} engineCryptoKey
 * @property {'string' | Knex.Config} databaseConnectionString
 */

/**
  * @typedef {Object} featureFlagsDTO
  *
  * @property {Boolean} activityManagerCacheable
  * @property {Boolean} processCacheable
  * @property {Boolean} nestedEndpoints
  */

/**
  * @typedef {Object} webOptionsDTO
  *
  * @property {String} host
  * @property {String} jwtSecret
  * @property {number} port
  * @property {http2Server.SecureServerOptions | undefined} http2Settings
  */

/**
 * @typedef {Object} Options
 * @param {featureFlagsDTO} featureFlags
 * @param {cryptoOptionsDTO} cryptoOptions
 * @param {instanceOptionsDTO} instanceOptions
 * @param {loggerOptionsDTO} loggerOptions
 * @param {webOptionsDTO} webOptions
 *
 */

/**
  *
  * @param {Options} options
  * @param {(err: Error) => {}} callBack
  */
function createServer(
  options = {
    cryptoOptions: defaultCryptoOptions(),
    instanceOptions: defaultInstanceOptions(),
    featureFlags: defaultFeatureFlags(),
    loggerOptions: defaultLoggerOptions(),
    webOptions: defaultWebOptions(),
  },
  callback = defaultStartCallback(),
) {
  try {
    const container = setupDependencyInjection(options);
    const app = setupWebConfiguration(container);
    const server = app.listen(
      options.webOptions.port,
      callback,
    );
    return server;
  } catch (err) {
    callback(err);
    return null;
  }
}

module.exports = createServer;
