const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.route("/login").post(userController.login); // login
router.route("/users").get(userController.getAllUsers); // get users
router.route("/checkuser").get(userController.checkUser); // get user
router.route("/getusertopic").get(userController.getUserTopic); // get user's topic

module.exports = router;
