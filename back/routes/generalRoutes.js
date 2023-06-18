const express = require("express");
const router = express.Router();
const generalController = require("../controller/generalController");

router.route("/").get(generalController.getRoutes); // home : get routes
router.route("/checkback").get(generalController.checkBack); // check backend status

module.exports = router;
