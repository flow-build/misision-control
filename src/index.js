/* eslint-disable no-console */
const createServer = require('./startup');
const options = require('./config');

createServer(options, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('cockpit-api started sucessfully');
});
