const { app, PORT } = require('./service/app');
const { connectToDb } = require('./service/database');
const cron = require('node-cron');
const axios = require('axios');
const { editUser, getAllUsers } = require('./controller/userController');

// Cron Job
cron.schedule('*/13 * * * *', async function () {
  try {
    // Check user session expiration
    axios.get(process.env.BACK_URL + 'user/users')
      .then(async (response) => {
        const users = response.data;
        // Iterate through the users
        for (const user of users) {
          // Check if sessionCreatedAt is older than 3 hours
          const sessionCreatedAt = new Date(user.sessionCreatedAt);
          const currentTime = new Date();
          const timeDifference = currentTime - sessionCreatedAt;
          const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60)); // Convert milliseconds to hours

          if (hoursDifference >= 3) {
            // Update the user session fields
            await editUser({
              body: {
                username: user.username,
                sessionId: '',
                sessionCreatedAt: '',
                email: null,
                password: null,
                isadmin: null,
                topic_token: null,
              },
            });
          }
        }
      })
      .catch(error => {
        console.error('Error fetching users: ', error);
      });

    // In order that the backend application stays alive (Render cloud application)
    axios.get(process.env.BACK_URL + 'checkback')
      .then(response => {
        if (response.statusText == 'OK') {
          console.log(response.data.message);
        }
      })
      .catch(error => {
        console.error('Error calling backend', error);
      });
  } catch (error) {
    console.error('Error in cron job:', error);
  }

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
});