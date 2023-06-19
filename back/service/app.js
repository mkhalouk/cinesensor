require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3 * 60 * 60 * 1000, // 3 hours to destroy the session (in milliseconds)
    },
  })
);

//routes
const userRouter = require("../routes/userRoutes");
const generalRouter = require("../routes/generalRoutes");

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.app = app;
  next();
});

app.use('/user', userRouter);
app.use('/', generalRouter);

module.exports = { app, PORT };
