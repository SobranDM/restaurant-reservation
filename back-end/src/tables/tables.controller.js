const service = require("./tables.service");
const hasProperties = require("../utils/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { isOccupied, checkCapacity, tableExists, reservationExists, isNumber, isLongEnough, isFree } = require("../utils/tableValidation");

// Method functions
async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

async function update(req, res) {
  const data = res.locals.table;
  res.locals.table.reservation_id = res.locals.reservation.reservation_id;
  await service.update(res.locals.table);
  res.json({ data });
}

async function destroy(req, res) {
  res.locals.table.reservation_id = null;
  const data = await service.destroy(res.locals.table);
  res.status(200).json({ data });
}

module.exports = {
  create: [
    hasProperties("table_name", "capacity"),
    isNumber(),
    isLongEnough(),
    asyncErrorBoundary(create)
  ],
  list: asyncErrorBoundary(list),
  update: [
    hasProperties("reservation_id"),
    asyncErrorBoundary(tableExists()),
    asyncErrorBoundary(reservationExists()),
    isOccupied(),
    checkCapacity(),
    asyncErrorBoundary(update)
  ],
  delete: [asyncErrorBoundary(tableExists()), isFree(), asyncErrorBoundary(destroy)]
}