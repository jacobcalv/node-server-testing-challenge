
exports.up = function(knex) {
  return knex.schema.createTable("orders", (table) => {
      table.increments()
      table.integer("orderNumber", 255).notNullable()
      table.string("name", 255).notNullable()
      table.string("item", 255).notNullable()
      table.integer("cost", 255).notNullable()
      table.boolean("paid").notNullable()
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("orders")
};
