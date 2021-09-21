exports.up = async (knex) => {
  await knex.schema
    .createTable("users", (table) => {
      table.increments("user_id");
      table.string("username", 200).notNullable();
      table.string("password", 200).notNullable();
      table.timestamps(false, true);
    })
    .createTable("owners", (table) => {
      table.increments("owner_id");
      table
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("user_id")
        .inTable("users");
    })
    .createTable("items", (table) => {
      table.increments("item_id");
      table
        .integer("owner_id")
        .notNullable()
        .unsigned()
        .references("owner_id")
        .inTable("owners");
      table.integer("location").notNullable().unsigned();
      table.string("name").notNullable();
      table.string("description");
      table.integer("price").notNullable().unsigned();
    });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("items");
  await knex.schema.dropTableIfExists("owners");
  await knex.schema.dropTableIfExists("users");
};
