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

module.exports = {
  create
}