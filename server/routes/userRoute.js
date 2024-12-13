const express = require("express");
const router = express.Router();

const { register,login } = require("../controller/userController");

// register route
router.post("/register", register);

// login route
router.post("/login", login);

module.exports = router;
