const knex = require("../db/connection");

// Method functions
function create(newReservation) {
  return knex("suppliers")
    .insert(newReservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

module.exports = {
  create,
}