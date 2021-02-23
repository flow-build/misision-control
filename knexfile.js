const path = require('path');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_HOST || 'localhost',
      port: process.env.POSTGRES_PORT || '5432',
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE
    },
    migrations: {
      directory: path.join(__dirname, '..', '/db/migrations')
    },
    seeds: {
      directory: path.join(__dirname, '..', '/db/seeds')
    },
    pool: {min: 10, max: 40}
  },
  test: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_HOST || '0.0.0.0',
      port: process.env.POSTGRES_PORT || '5432',
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE
    },
    migrations: {
      directory: path.join(__dirname, '..', '/db/migrations')
    },
    seeds: {
      directory: path.join(__dirname, '..', '/db/seeds')
    },
    pool: {min: 10, max: 40},
    useNullAsDefault: true
  }
};
