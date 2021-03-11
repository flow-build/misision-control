/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
  path: path.resolve(__dirname, '..', '.env'),
});

const createServer = require('./startup');
const options = require('./config');

createServer(options, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('cockpit-api started sucessfully');
});
