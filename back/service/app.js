require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

//routes
const userRouter = require("../routes/userRoutes");
const generalController = require("../controller/generalController");

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRouter);

app.get('/', (req, res) => generalController.getRoutes(req, res, app)); // pass the app to the controller

module.exports = { app, PORT };
