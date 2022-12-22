const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { body } = require('express-validator');
const { login, signup, change_password } = require("../controller/auth");
const { home, about } = require("../controller/home");

// routes
router.post("/login",
    body("username").not().isEmpty().trim().escape(),
    body("password").not().isEmpty().trim().escape().isLength({ min: 4 }),
    login);

router.post("/sign-up",
    body("name").not().isEmpty().trim().escape(),
    body("username").not().isEmpty().trim().escape(),
    body("password").not().isEmpty().trim().escape().isLength({ min: 4 }),
    signup);

router.post("/change_password",
    body("username").not().isEmpty().trim().escape(),
    body("password").not().isEmpty().trim().escape().isLength({ min: 4 }),
    change_password);

router.get("/", authenticateToken,home);
router.get("/about", about);


//to check tha validation of the jwt token
function authenticateToken(req, res, next) {

    //get token from header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.status(401).json({status:false,msg : "token is required"});
    //check veryfication
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ status: false, msg: "invalid token" });
        req.user = user;
        next();
    });
}
module.exports = router;