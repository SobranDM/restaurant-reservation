const service = require("./reservations.service");
const hasProperties = require("../utils/hasProperties");
const { isDate, isTime, isNumber, isNotTuesday, isFuture, makeDateObjects, isOpen } = require("../utils/reservationValidation");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function reservationExists(req, res, next) {
  const reservation = await service.getReservation(req.params.reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    next();
  } else {
    next(`Reservation with id ${reservation_id} does not exist.`)
  }
}

// Method functions
async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function listByDate(req, res) {
  const { date } = req.query;
  const data = await service.listByDate(date);
  res.json({ data });
}

function getReservation(req, res) {
  const data = res.locals.reservation;
  res.json({ data });
}

module.exports = {
  listByDate: asyncErrorBoundary(listByDate),
  create: [
    hasProperties("first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people"),
    isDate(),
    isTime(),
    makeDateObjects(),
    isNumber(),
    isNotTuesday(),
    isFuture(),
    isOpen(),
    asyncErrorBoundary(create)
  ],
  getReservation: [asyncErrorBoundary(reservationExists), getReservation]
};
