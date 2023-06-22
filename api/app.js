require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cron = require('node-cron');
const generalRouter = require('./routes/generalRoutes');
const MQTTService = require('./service/mqttService');
const fakerDataService = require('./service/fakerData');

const app = express();
const PORT = 5000;

// routes
app.use('/', generalRouter);

// services
const mqttService = new MQTTService();

// Cron job for the api not to hibernate
cron.schedule('*/13 * * * *', async function () {
	try {
		// In order that the api stays alive (Render cloud application)
		axios.get(process.env.API_URL + 'checkApi')
			.then(response => {
				if (response.statusText == 'OK') {
					console.log(response.data.message);
				}
			})
			.catch(error => {
				console.error('Error calling api', error);
			});
	} catch (error) {
		console.error('Error in cron job:', error);
	}

});

app.listen(PORT, (error) => {
	// Connect to MQTT broker
	mqttService.connect();

	if (!error) {
		console.log("API is successfully running, and App is listening on port " + PORT);

		// Cron Job every 5 seconds to send data to backend server
		cron.schedule('*/5 * * * * *', function () {
			try {
				// Generate the false data
				const sensorData = fakerDataService.generateSensorData();

				// Publish the sensor data to MQTT topic
				mqttService.publish('cinesensor/sensorsdata', sensorData);
			} catch (error) {
				console.error('Error in cron job:', error);
			}
		});
	} else {
		console.log("Error occurred, API can't start", error);
	}
});

app.get('/', (req, res) => {
	res.send('Hello world! This is my API.');
});