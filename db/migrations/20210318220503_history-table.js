exports.up = async (knex) => {
  await knex.schema.createTable('history', (table) => {
    table.uuid('id').primary();
    table.uuid('user_id').notNull();
    table.foreign('user_id').references('user.id');
    table.jsonb('request').notNull();
    table.jsonb('response');
    table.jsonb('error');
    table.timestamp('created_at').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('history');
};
