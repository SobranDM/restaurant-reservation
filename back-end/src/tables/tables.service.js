const knex = require("../db/connection");

// Method functions
function create(newTable) {
  return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((createdTables) => createdTables[0]);
}

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function read(table_id) {
  return knex("tables")
    .select("*")
    .where({ table_id })
    .first();
}

function update(table) {
    return knex("tables")
      .select("*")
      .where({ table_id: table.table_id })
      .update(table, "*")
      .then((records) => records[0])
}

module.exports = {
  create,
  list,
  update,
  read
}