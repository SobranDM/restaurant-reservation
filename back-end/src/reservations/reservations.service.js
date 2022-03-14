const knex = require("../db/connection");

// Method functions
function create(newReservation) {
  return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function listByDate(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .orderBy("reservation_time");
}

function getReservation(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .then((reservations) => reservations[0])
}

module.exports = {
  create,
  listByDate,
  getReservation
}