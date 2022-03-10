const knex = require("../db/connection");

// Method functions
function create(newReservation) {
  return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function listByDate(date) {
  console.log(date);
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .orderBy("reservation_time");
}

module.exports = {
  create,
  listByDate
}