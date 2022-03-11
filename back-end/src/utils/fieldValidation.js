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

function isNumber() {
  return function (req, res, next) {
    try {
      if(typeof Number(req.body.data.people) === "number") {
        next();
      } else {
        const error = new Error(`Field: "people" is not a valid number`);
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
    const submitDay = new Date(req.body.data.reservation_date).getDay();
    try {
      if (submitDay != 1) {
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
    const submitDate = new Date(req.body.data.reservation_date);
    const todaysDate = new Date();
    try {
      if (submitDate >= todaysDate) {
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

module.exports = {
  isDate,
  isTime,
  isNumber,
  isNotTuesday,
  isFuture
}