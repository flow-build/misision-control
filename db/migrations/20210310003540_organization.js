exports.up = async (knex) => {
  await knex.schema.createTable('organization', (table) => {
    table.uuid('id').primary();
    table.string('name', 255).notNull().unique();
    table.string('secret_key', 512).notNull();
    table.string('url', 512).notNull();
    table.timestamp('created_at').notNullable();
    table.timestamp('updated_at').notNullable();
    table.timestamp('disabled_at');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('organization');
};
