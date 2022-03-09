/**
 * List handler for reservation resources
 */

const service = require("./reservations.service");
const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  res.json({
    data: [],
  });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

module.exports = {
  list,
  create: [
    hasProperties("first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people"),
    asyncErrorBoundary(create)
  ]
};
