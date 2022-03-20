const service = require("./reservations.service");
const hasProperties = require("../utils/hasProperties");
const { isDate, isTime, isNumber, isNotTuesday, isFuture, makeDateObjects, isOpen, reservationExists } = require("../utils/reservationValidation");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function asDateString(date) {
  return `${date.getFullYear().toString(10)}-${(date.getMonth() + 1)
    .toString(10)
    .padStart(2, "0")}-${date.getDate().toString(10).padStart(2, "0")}`;
}

// Method functions
async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function listByDate(req, res) {
  const { date } = req.query;

  if (!date) {
    date = asDateString(new Date());
  }
  
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
  getReservation: [asyncErrorBoundary(reservationExists()), getReservation]
};
