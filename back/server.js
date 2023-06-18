const { app, PORT } = require('./service/app');
const { connectToDb } = require('./service/database');

app.listen(PORT, (error) => {
	if (!error) {
		// Connexion à la base de données
		(async () => { await connectToDb(); })();
		console.log("Server is Successfully Running, and App is listening on port " + PORT)
	}
	else {
		console.log("Error occurred, server can't start", error);
	}
}
);