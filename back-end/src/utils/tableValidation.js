const resService = require("../reservations/reservations.service");
const service = require("../tables/tables.service");

function tableExists() {
  return async function (req, res, next) {
    try {
      const table = await service.read(req.params.table_id);
      if (table) {
        res.locals.table = table;
        next();
      } else {
        const error = new Error(`Table with id ${req.params.table_id} does not exist.`);
        error.status = 404;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }
}

function isNumber() {
  return function (req, res, next) {
    try {
      if (typeof req.body.data.capacity === "number") {
        next();
      } else {
        const error = new Error(`Field: "capacity" is not a valid number.`);
        error.status = 400;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }
}

function isLongEnough() {
  return function (req, res, next) {
    try {
      if (req.body.data.table_name.length >= 2) {
        next();
      } else {
        const error = new Error(`Field: table_name must be at least 2 characters.`);
        error.status = 400;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }
}

function getResFromTable() {
  return async function (req, res, next) {
    try {
      const reservation = await resService.read(res.locals.table.reservation_id);
      if (reservation) {
        res.locals.reservation = reservation;
        next();
      } else {
        const error = new Error(`Reservation with id ${res.locals.table.reservation_id} does not exist.`);
        error.status = 404;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }
}

function reservationExists() {
  return async function (req, res, next) {
    try {
      const reservation = await resService.read(req.body.data.reservation_id);
      if (reservation) {
        res.locals.reservation = reservation;
        next();
      } else {
        const error = new Error(`Reservation with id ${req.body.data.reservation_id} does not exist.`);
        error.status = 404;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }
}

function isFree() {
  return function (req, res, next) {
    try {
      if (res.locals.table.reservation_id) {
        next();
      } else {
        const error = new Error(`Table with id ${res.locals.table.table_id} is not occupied!`);
        error.status = 400;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }
}

function isOccupied() {
  return function (req, res, next) {
    try {
      if (!res.locals.table.reservation_id) {
        next();
      } else {
        const error = new Error(`Table with id ${res.locals.table.table_id} is occupied!`);
        error.status = 400;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }
}
function checkCapacity() {
  return function (req, res, next) {
    try {
      const tableCapacity = res.locals.table.capacity;
      const resPeeps = res.locals.reservation.people;

      if (tableCapacity >= resPeeps) {
        next();
      }
      else {
        const tableName = res.locals.table.table_name;
        const tableCapacity = res.locals.table.capacity;
        const error = new Error(`Table ${tableName} has a capacity of ${tableCapacity}. Please choose a table that can accomodate this reservation.`);
        error.status = 400;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }
}

function isBooked() {
  return function (req, res, next) {
    try {
      const status = res.locals.reservation.status;
      if (status === "booked") {
        next();
      } else {
        const error = new Error(`Reservation must be booked. Cannot seat a table that is already seated or finished.`);
        error.status = 400;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  isOccupied,
  checkCapacity,
  tableExists,
  reservationExists,
  isNumber,
  isLongEnough,
  isFree,
  getResFromTable,
  isBooked
}