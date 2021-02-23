const { Cockpit, Engine } = require('@fieldlink/workflow-engine');
const Knex = require('knex');

class InstanceService {
  constructor({ instanceOptions }) {
    if (!instanceOptions) {
      throw new Error('instanceOptions not Setted');
    }

    const {
      persistMode,
      databaseConnectionString,
      engineCryptoKey,
    } = instanceOptions;
    if (persistMode === 'knex'
      && !databaseConnectionString) {
      throw new Error('database Settings not Setted');
    }
    if (!engineCryptoKey) {
      throw new Error('cockpit cryptoKey not Setted');
    }

    this.db = Knex(databaseConnectionString);
    this.cockpit = new Cockpit(persistMode, this.db);
    Engine.kill();
  }
}

module.exports = InstanceService;
