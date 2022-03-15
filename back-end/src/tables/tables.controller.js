const service = require("./tables.service");
const hasProperties = require("../utils/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function tableExists(req, res) {
  const table = await service.read(req.params.table_id);
  if (table) {
    res.locals.table = table;
    next();
  } else {
    next(`Table with id ${table_id} does not exist.`);
  }
}

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
  const table_id = req.params.table_id;
  const data = await service.update(req.body.data);
  res.json({ data });
}

module.exports = {
  create: [
    hasProperties("table_name", "capacity"),
    asyncErrorBoundary(create)
  ],
  list: asyncErrorBoundary(list),
  update: [ asyncErrorBoundary(tableExists), asyncErrorBoundary(update) ]
}