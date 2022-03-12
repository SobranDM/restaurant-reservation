const service = require("./tables.service");
const hasProperties = require("../utils/hasProperties");
//const { } = require("../utils/tablesValidation");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Method functions
async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

module.exports = {
  create: [
    hasProperties("table_name", "capacity"),
    asyncErrorBoundary(create)
  ]
}