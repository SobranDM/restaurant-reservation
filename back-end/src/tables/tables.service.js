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

async function update(table, reservation) {
  await knex.transaction(async trx => {
    await knex("tables")
      .select("*")
      .where({ table_id: table.table_id })
      .update(table, "*")

    await knex("reservations")
      .select("*")
      .where({ reservation_id: reservation.reservation_id })
      .update(reservation)
  });
}

module.exports = {
  create,
  list,
  update,
  read
}