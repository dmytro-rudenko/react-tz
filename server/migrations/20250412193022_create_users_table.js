exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.decimal('balance').notNullable().defaultTo(100);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };
  