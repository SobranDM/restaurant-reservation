const service = require("./tables.service");
const hasProperties = require("../utils/hasProperties");
const { } = require("../utils/tablesValidation");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");



module.exports = {
  create: [
    hasProperties("table_name", "capacity"),
    asyncErrorBoundary(create)
  ]
}