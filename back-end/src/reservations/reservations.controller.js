/**
 * List handler for reservation resources
 */

const service = require("./reservations.service");
const hasProperties = require("../errors/hasProperties");

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
    asyncErrorBoundary(hasProperties("first_name")),
    asyncErrorBoundary(hasProperties("last_name")),
    asyncErrorBoundary(hasProperties("mobile_number")),
    asyncErrorBoundary(hasProperties("reservation_date")),
    asyncErrorBoundary(hasProperties("reservation_time")),
    asyncErrorBoundary(hasProperties("people")),
    asyncErrorBoundary(create)
  ]
};
