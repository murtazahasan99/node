const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
var authRoutes = require("./routes/auth");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoutes);

app.get("/", authenticateToken, (req, res) => {
    console.log(req.user);
  res.send("hello world");
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
    console.log(token);
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
