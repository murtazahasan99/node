const express = require("express");
const { login, signup } = require("../controller/auth");
const router = express.Router();
require("dotenv").config();


router.post("/login", login)
router.post("/sign-up", signup)



module.exports = router;
