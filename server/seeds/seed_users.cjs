exports.seed = async function(knex) {
  await knex('orders').del();
  await knex('users').del();

  await knex('users').insert([
    {
      id: knex.raw('gen_random_uuid()'),
      name: 'Alice',
      email: 'alice@example.com',
      balance: 150.00
    },
    {
      id: knex.raw('gen_random_uuid()'),
      name: 'Bob',
      email: 'bob@example.com',
      balance: 80.00
    },
    {
      id: knex.raw('gen_random_uuid()'),
      name: 'Charlie',
      email: 'charlie@example.com',
      balance: 200.00
    }
  ]);
};
