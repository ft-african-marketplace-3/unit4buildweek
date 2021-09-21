exports.up = async (knex) => {
  await knex.schema
    .createTable("users", (users) => {
      users.increments("user_id");
      users.string("username", 200).notNullable();
      users.string("password", 200).notNullable();
      users.timestamps(false, true);
    })
    .createTable("owners", (owners) => {
      owners.increments("owner_id");
      owners
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("user_id")
        .inTable("users");
    })
    .createTable("items", (items) => {
      items.increments("item_id");
      items
        .integer("owner_id")
        .notNullable()
        .unsigned()
        .references("owner_id")
        .inTable("owners");
      items.integer("location").notNullable().unsigned();
      items.string("name").notNullable();
      items.string("description");
      items.integer("price").notNullable().unsigned();
    });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("items");
  await knex.schema.dropTableIfExists("owners");
  await knex.schema.dropTableIfExists("users");
};
