exports.up = async knex => {
  await knex.schema.createTableIfNotExists("contact_list", table => {
    table.increments("id");
    table
      .integer("organization_id")
      .notNullable()
      .references("id")
      .inTable("organization")
      .index();
  });

  await knex.schema.alterTable("campaign_contact", table => {
    table
      .integer("contact_list_id")
      .nullable()
      .references("id")
      .inTable("contact_list")
      .index();
  });

  await knex.schema.alterTable("campaign", table => {
    table
      .integer("contact_list_id")
      .nullable()
      .references("id")
      .inTable("contact_list")
      .index();
  });
};

exports.down = async knex => {
  await knex.schema.dropTable("contact_list");
  await knex.schema.alterTable("campaign_contact", table => {
    table.dropColumn("contact_list_id");
  });
  await knex.schema.alterTable("campaign", table => {
    table.dropColumn("contact_list_id");
  });
};
