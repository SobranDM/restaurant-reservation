/**
 * List handler for reservation resources
 */

const service = require("./reservations.service");
const hasProperties = require("../utils/hasProperties");
const { isDate, isTime, isNumber, isNotTuesday, isFuture } = require("../utils/fieldValidation");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function listByDate(req, res) {
  const { date } = req.query;
  const data = await service.listByDate(date);
  res.json({ data });
}

module.exports = {
  listByDate,
  create: [
    hasProperties("first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people"),
    isDate(),
    isTime(),
    isNumber(),
    isNotTuesday(),
    isFuture(),
    asyncErrorBoundary(create)
  ]
};
