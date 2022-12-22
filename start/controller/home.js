const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { register,getUsereByUsername } = require("../model/db");


const home = async (req, res) => {
  res.send("hello world")
};

const about = async (req, res) => {
  res.send("hello from about")
};

module.exports = {
  home,
  about
}