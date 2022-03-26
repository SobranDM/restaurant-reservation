
const service = require("../reservations/reservations.service");

function isDate() {
  return function (req, res, next) {
    try {
      if (Date.parse(req.body.data.reservation_date)) {
        next();
      } else {
        const error = new Error(`Field: "reservation_date" is not a valid date`);
        error.status = 400;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }
}

function isTime() {
  return function (req, res, next) {
    try {
      const isValid = /[0-9]{2}:[0-9]{2}/.test(req.body.data.reservation_time);
      if (isValid) {
        next();
      } else {
        const error = new Error(`Field: "reservation_time" is not a valid time`);
        error.status = 400;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }
}

function makeDateObjects() {
  return function (req, res, next) {
    res.locals.submitDate = new Date(`${req.body.data.reservation_date} ${req.body.data.reservation_time}`);
    res.locals.currentDate = new Date();
    next();
  }
}

function isNumber() {
  return function (req, res, next) {
    try {
      if (typeof req.body.data.people === "number") {
        next();
      } else {
        const error = new Error(`Field: "people" is not a valid number.`);
        error.status = 400;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }
}

function isNotTuesday() {
  return function (req, res, next) {
    try {
      if (res.locals.submitDate.getDay() != 2) {
        next();
      } else {
        const error = new Error(`We apologize. The restaurant is closed on Tuesdays.`);
        error.status = 400;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }
}

function isFuture() {
  return function (req, res, next) {
    try {
      if (res.locals.submitDate >= res.locals.currentDate) {
        next();
      } else {
        const error = new Error(`The reservation must be in the future. We cannot time travel.`);
        error.status = 400;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }
}

function isOpen() {
  return function (req, res, next) {
    try {
      const submitTime = `${res.locals.submitDate.getHours()}:${res.locals.submitDate.getMinutes()}`;
      if (submitTime >= "10:30" && submitTime <= "21:30") {
        next();
      } else {
        const error = new Error(`We apologize. We only accept reservations between 10:30 AM and 9:30 PM.`);
        error.status = 400;
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
      const reservation = await service.read(req.params.reservation_id);
      if (reservation) {
        res.locals.reservation = reservation;
        next();
      } else {
        const error = new Error(`Reservation with id ${req.params.reservation_id} does not exist.`);
        error.status = 404;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }
}

function reservationIsBooked() {
  return function (req, res, next) {
    try {
      const status = req.body.data.status;
      if (status === "booked" || status === undefined) {
        next();
      } else {
        const error = new Error(`New reservation status must be 'booked'. ${status} is not valid.`)
        error.status = 400;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }
}

function statusIsValid() {
  return function (req, res, next) {
    try {
      const status = req.body.data.status;
      if (status === "booked" || status === "seated" || status === "finished" || status === "cancelled") {
        next();
      } else {
        const error = new Error(`Reservation status must be one of: booked, seated, finished, cancelled. ${status} is not valid.`);
        error.status = 400;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }
}

function alreadyFinished() {
  return function (req, res, next) {
    try {
      const status = res.locals.reservation.status;
      if (status != "finished") {
        next();
      } else {
        const error = new Error(`Cannot change the status of a reservation that is already finished.`);
        error.status = 400;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  isDate,
  isTime,
  isNumber,
  isNotTuesday,
  isFuture,
  isOpen,
  makeDateObjects,
  reservationExists,
  reservationIsBooked,
  statusIsValid,
  alreadyFinished
}