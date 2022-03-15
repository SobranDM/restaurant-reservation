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
    .then((table) => table[0]);
}

function update(updatedTable) {
  return knex("tables")
    .select("*")
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable, "*");
}

module.exports = {
  create,
  list,
  update,
  read
}