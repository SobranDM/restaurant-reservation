const service = require("./reservations.service");
const hasProperties = require("../utils/hasProperties");
const {
  isDate,
  isTime,
  isNumber,
  isNotTuesday,
  isFuture,
  makeDateObjects,
  isOpen,
  reservationExists,
  alreadyFinished,
  reservationIsBooked,
  statusIsValid,
} = require("../utils/reservationValidation");
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

async function list(req, res) {
  const { date, mobile_number } = req.query;
  if (mobile_number) {
    const data = await service.listByNumber(mobile_number);
    return res.json({ data });
  }
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

async function updateStatus(req, res) {
  const updatedReservation = res.locals.reservation;
  updatedReservation.status = req.body.data.status;
  const data = await service.update(updatedReservation);
  res.status(200).json({ data });
}

async function update(req, res) {
  const data = await service.update(req.body.data);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasProperties(
      "first_name",
      "last_name",
      "mobile_number",
      "reservation_date",
      "reservation_time",
      "people"
    ),
    isDate(),
    isTime(),
    makeDateObjects(),
    isNumber(),
    isNotTuesday(),
    isFuture(),
    isOpen(),
    reservationIsBooked(),
    asyncErrorBoundary(create),
  ],
  getReservation: [asyncErrorBoundary(reservationExists()), getReservation],
  updateStatus: [
    asyncErrorBoundary(reservationExists()),
    statusIsValid(),
    alreadyFinished(),
    asyncErrorBoundary(updateStatus),
  ],
  update: [
    hasProperties(
      "first_name",
      "last_name",
      "mobile_number",
      "reservation_date",
      "reservation_time",
      "people"
    ),
    reservationExists(),
    isDate(),
    isTime(),
    makeDateObjects(),
    isNumber(),
    isNotTuesday(),
    isFuture(),
    isOpen(),
    reservationIsBooked(),
    asyncErrorBoundary(update)
  ]
};
