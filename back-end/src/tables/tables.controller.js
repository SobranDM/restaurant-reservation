const service = require("./tables.service");
const hasProperties = require("../utils/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { isOccupied, checkCapacity, tableExists, reservationExists, isNumber, isLongEnough, isFree, getResFromTable } = require("../utils/tableValidation");

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
  res.locals.table.reservation_id = res.locals.reservation.reservation_id;
  res.locals.reservation.status = 'seated';
  const data = await service.update(res.locals.table, res.locals.reservation);
  res.json({ data });
}

async function destroy(req, res) {
  res.locals.table.reservation_id = null;
  res.locals.reservation.status = 'finished';
  const data = await service.update(res.locals.table, res.locals.reservation);
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
    isOccupied(),
    asyncErrorBoundary(reservationExists()),
    checkCapacity(),
    asyncErrorBoundary(update)
  ],
  delete: [
    asyncErrorBoundary(tableExists()),
    isFree(),
    asyncErrorBoundary(getResFromTable()),
    asyncErrorBoundary(destroy)
  ]
}