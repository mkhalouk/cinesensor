const { app, PORT } = require('./service/app');
const { connectToDb } = require('./service/database');
const cron = require('node-cron');
const axios = require('axios');

// IN ORDER THAT THE API STAYS ALIVE (Render cloud application)
cron.schedule('*/13 * * * *', function() {
  axios.get(process.env.BACK_URL+'checkback')
  .then(response => {
    if (response.statusText == 'OK') {
      console.log(response.data.message);
    }
  })
  .catch(error => {
    console.error('Error calling backend', error);
  });
});

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