const knex = require("../db/connection");

// Method functions
function create(newTable) {
  return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((createdTables) => createdTables[0]);
}

module.exports = {
  create
}