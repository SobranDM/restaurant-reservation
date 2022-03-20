const knex = require("../db/connection");

// Method functions
function create(newReservation) {
  return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function listByDate(listDate) {
  return knex("reservations")
    .select("*")
    .whereNotIn("status", ["finished", "cancelled"])
    .andWhere({ reservation_date: listDate })
    .orderBy("reservation_time");
}

function getReservation(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .then((reservations) => reservations[0])
}

function update(updatedReservation) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
    .then((reservations) => reservations[0]);
}

module.exports = {
  create,
  listByDate,
  getReservation,
  update
}