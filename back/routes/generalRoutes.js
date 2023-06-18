const express = require("express");
const router = express.Router();
const generalController = require("../controller/generalController");

router.route("/").post(generalController.getRoutes); // home : get routes

module.exports = router;
