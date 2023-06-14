const express = require('express');

const app = express();
const PORT = 5000;

app.listen(PORT, (error) =>{
	if(!error)
		console.log("API is Successfully Running, and App is listening on port "+ PORT)
	else
		console.log("Error occurred, api can't start", error);
	}
);


app.get('/', (req, res) => {
    res.send('Hello world! This is my API.');
});