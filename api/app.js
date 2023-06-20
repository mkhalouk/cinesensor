require('dotenv').config();
const express = require('express');
const { connectToDb } = require('./service/database');

const app = express();
const PORT = 5000;

app.listen(PORT, (error) => {
	if (!error) {
		// Connexion à la base de données
		(async () => { await connectToDb(); })();
		console.log("API is Successfully Running, and App is listening on port " + PORT)

		// set timeout : callback func bash tgeneri numbers u func katsavi f basedonnes u func katpublish via mqtt data
		// TODO: api sends to back to stock in the database
		// humidity, noise, pressure, temperature
	}
	else {
		console.log("Error occurred, api can't start", error);
	}
}
);


app.get('/', (req, res) => {
	res.send('Hello world! This is my API.');
});