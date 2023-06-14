const { app, PORT } = require('./app.js');

app.listen(PORT, (error) =>{
	if(!error)
		console.log("Server is Successfully Running, and App is listening on port "+ PORT)
	else
		console.log("Error occurred, server can't start", error);
	}
);


app.get('/', (req, res) => {
    res.send('Hello world! This is my backend.');
});