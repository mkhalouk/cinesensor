const express = require("express");
const router = express.Router();
const sensorDataController = require("../controller/sensorDataController");

router.route("/sensors").post(sensorDataController.getAllSensorData); // get all data from sensor
router.route("/savedata").post(sensorDataController.saveSensorDataFromMQTT); // save data coming from mqtt message
router.route("/get12").post(sensorDataController.getLast12SensorData); // get the last 12 data from mongodb

module.exports = router;
