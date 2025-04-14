exports.up = function(knex) {
    return knex.schema.createTable('orders', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('userId').notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.uuid('productId').notNullable().references('id').inTable('products').onDelete('CASCADE');
      table.integer('quantity').notNullable();
      table.decimal('totalPrice').notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('orders');
  };