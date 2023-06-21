require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cron = require('node-cron');
const generalRouter = require('./routes/generalRoutes');
const MQTTService = require('./service/mqttService');

const app = express();
const PORT = 5000;

// routes
const baseUrl = process.env.API_URL;
app.use('/', generalRouter);

// services
const mqttService = new MQTTService();

app.listen(PORT, (error) => {
	if (!error) {
		console.log("API is successfully running, and App is listening on port " + PORT);

		// Cron Job every 5 seconds to send data to backend server
		cron.schedule('*/5 * * * * *', function () {
			try {
				axios.get(baseUrl + '/sensordata')
					.then(response => {
						if (response.statusText == 'OK') {
							const sensorData = response.data;
							// console.log(sensorData);

							// Publish the sensor data to MQTT topic
							mqttService.publish('cinesensor/sensorsdata', JSON.stringify(sensorData));
						}
					})
					.catch(error => {
						console.error('Error calling API', error);
					});
			} catch (error) {
				console.error('Error in cron job:', error);
			}
		});

		// Connect to MQTT broker
		mqttService.connect();
	} else {
		console.log("Error occurred, API can't start", error);
	}
});

app.get('/', (req, res) => {
	res.send('Hello world! This is my API.');
});