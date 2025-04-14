exports.seed = async function(knex) {
  await knex('products').del();

  await knex('products').insert([
    {
      id: knex.raw('gen_random_uuid()'),
      name: 'Laptop',
      price: 10.99,
      stock: 3
    },
    {
      id: knex.raw('gen_random_uuid()'),
      name: 'Headphones',
      price: 19.99,
      stock: 3
    },
    {
      id: knex.raw('gen_random_uuid()'),
      name: 'Mouse',
      price: 49.99,
      stock: 5
    }
  ]);
};
