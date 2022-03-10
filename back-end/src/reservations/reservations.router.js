/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/reservations").get(controller.listByDate).post(controller.create).all(methodNotAllowed);

module.exports = router;
