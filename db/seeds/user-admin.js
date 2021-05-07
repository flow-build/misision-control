const {v4} = require('uuid');
const options = require('../../src/config');
const {
  LoggerService,
  CryptoService
} = require('../../src/services')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      console.log(options.cryptoOptions)
      const logger = new LoggerService({loggerOptions: options.loggerOptions});
      const cryptoService = new CryptoService({
        cryptoOptions: options.cryptoOptions,
        loggerService: logger
      });
      const password = cryptoService.encryptPayload("admin");
      return knex('user').insert([
        {id: v4(), 
          name: 'admin',
          email: 'flowbuild@flowbuild.com',
          password:password,
          created_at: new Date(),
          updated_at: new Date()
        },
      ]);
    });
};
