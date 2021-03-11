exports.up = (knex) => knex.schema.createTable('user', (table) => {
  table.uuid('id').primary();
  table.string('name', 255).notNull();
  table.string('email', 255).notNull().unique();
  table.string('password', 255).notNull();
  table.timestamp('created_at').notNullable();
  table.timestamp('updated_at').notNullable();
  table.timestamp('disabled_at');
}).then(() => knex.schema.createTable('group', (table) => {
  table.uuid('id').primary();
  table.string('name', 255).notNull();
  table.string('description', 512);
  table.timestamp('created_at').notNullable();
  table.timestamp('updated_at').notNullable();
  table.timestamp('disabled_at');
}).then(() => knex.schema.createTable('role', (table) => {
  table.uuid('id').primary();
  table.string('name', 255).notNull();
  table.string('description', 512);
  table.timestamp('created_at').notNullable();
  table.timestamp('updated_at').notNullable();
  table.timestamp('disabled_at');
}).then(() => knex.schema.createTable('policy', (table) => {
  table.uuid('id').primary();
  table.string('name', 255).notNull();
  table.string('description', 512);
  table.timestamp('created_at').notNullable();
  table.timestamp('updated_at').notNullable();
  table.timestamp('disabled_at');
}).then(() => knex.schema.createTable('user_x_role', (table) => {
  table.uuid('user_id').notNullable();
  table.foreign('user_id').references('user.id');
  table.uuid('role_id').notNullable();
  table.foreign('role_id').references('role.id');
}).then(() => knex.schema.createTable('user_x_group', (table) => {
  table.uuid('user_id').notNullable();
  table.foreign('user_id').references('user.id');
  table.uuid('group_id').notNullable();
  table.foreign('group_id').references('group.id');
}).then(() => knex.schema.createTable('group_x_role', (table) => {
  table.uuid('role_id').notNullable();
  table.foreign('role_id').references('role.id');
  table.uuid('group_id').notNullable();
  table.foreign('group_id').references('group.id');
}).then(() => knex.schema.createTable('role_x_policy', (table) => {
  table.uuid('id').primary();
  table.integer('permission_type').notNullable();
  table.uuid('role_id').notNullable();
  table.foreign('role_id').references('role.id');
  table.uuid('policy_id').notNullable();
  table.foreign('policy_id').references('policy.id');
}))))))));

exports.down = async (knex) => {
  await knex.schema.dropTable('role_x_policy');
  await knex.schema.dropTable('group_x_role');
  await knex.schema.dropTable('user_x_role');
  await knex.schema.dropTable('user_x_group');
  await knex.schema.dropTable('policy');
  await knex.schema.dropTable('role');
  await knex.schema.dropTable('group');
  await knex.schema.dropTable('user');
};
