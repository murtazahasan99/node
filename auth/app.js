const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
var authRoutes = require("./routes/auth");
require("dotenv").config();

//to be able to receive json data 
app.use(express.json());

//to be able to recevie x-www-form-data
app.use(express.urlencoded({ extended: false }));

//to serve any request has /auth prefix
app.use("/auth", authRoutes);

app.get("/", authenticateToken, (req, res) => {
    console.log(req.user);
  res.send("hello world");
});

//to check tha validation of the jwt token
function authenticateToken(req, res, next) {

  //get token from header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  //check veryfication
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.status(403).json({msg:"invalid token"});
    req.user = user;
    next();
  });
}


const port = 5000;
app.listen(port, () => {
  console.log(`servier listening on prot ${port}`);
});
