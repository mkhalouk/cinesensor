const express = require('express');
const router = express.Router();
const generalController = require('../controller/generalController');

// Routes
router.get('/checkapi', generalController.checkApi);
router.get('/sensordata', generalController.generateSensorData);

module.exports = router;
