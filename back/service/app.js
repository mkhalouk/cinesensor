require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

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
