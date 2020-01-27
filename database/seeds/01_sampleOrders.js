
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('orders').del()
    .then(function () {
      // Inserts seed entries
      return knex('orders').insert([
        {orderNumber: "265451", name: 'Rich Ralph', item: 'Pokemon Game', cost: 18.50, paid: false},
        {orderNumber: "156451", name: 'Rich Ryan', item: 'Gameboy SP', cost: 40.50, paid: true},
        {orderNumber: "369852", name: 'Rich Ronda', item: 'Nintendo Switch', cost: 300.00, paid: false}
      ]);
    });
};
