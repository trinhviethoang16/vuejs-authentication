var express = require("express");

var userController = require("../src/users/userController");
const router = express.Router();

router.route("/login").post(userController.login);
router.route("/register").post(userController.register);

module.exports = router;
