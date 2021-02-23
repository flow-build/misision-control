/* eslint-disable max-len */
const cryptoOptions = {
  cryptoIV: process.env.JWT_ENCRYPT_IV || '18c4685fd4a5fd13',
  cryptoKey: process.env.JWT_ENCRYPT_KEY || '0479b527934715539e584f45677ab193',
};

const instanceOptions = {
  engineCryptoKey: process.env.ENGINE_CRYPTO_KEY
  || '31490127699897466090652308592916',
  databaseConnectionString: process.env.DATABASE_CONNECTION_STRING
    || 'postgresql://lendico-workflow-dev:123456@localhost:5432/workflow-db-dev',
  persistMode: process.env.PERSIST_MODE || 'knex',
  missionControlSecretKey: process.env.MISSION_CONTROL_SECRET_KEY
  || '123456',
};

const loggerOptions = {
  logLevel: process.env.LOG_LEVEL || 'DEBUG',
};

const featureFlags = {
  activityManagerCacheable: process.env.ACTIVITY_MANAGER_FLAG || true,
  processCacheable: process.env.PROCESS_CACHE_FLAG || false,
  nestedEndpoints: process.env.NESTED_ENDPOINTS_FLAG || true,
};

const webOptions = {
  jwtSecret: process.env.JWT_KEY || '1234',
  port: process.env.PORT || 3000,
};

const options = {
  cryptoOptions,
  instanceOptions,
  featureFlags,
  loggerOptions,
  webOptions,
};

module.exports = options;
