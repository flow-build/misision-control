const { v4 } = require('uuid');

exports.seed = async (knex) => {
  const defaultOrganization = {
    id: v4(),
    name: 'flowbuild',
    secret_key: process.env.FLOWBUILD_SECRET_KEY,
    url: 'observer:3100',
    created_at: new Date(),
    updated_at: new Date(),
  };
  await knex('organization').del();
  await knex('organization').insert([
    defaultOrganization,
  ]);
};
