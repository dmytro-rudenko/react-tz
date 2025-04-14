exports.up = function(knex) {
    return knex.schema.createTable('products', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.string('name').notNullable();
      table.decimal('price').notNullable();
      table.integer('stock').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('products');
  };