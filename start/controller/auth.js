const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');
const { register, getUsereByUsername,cahngePassword } = require("../model/db");


const login = async (req, res) => {
  //check validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: false, msg: "Input validation Error", errorsDetiles: errors.array() });
  }

  try {
    let { username, password } = req.body;
    //get user from db
    const user = await getUsereByUsername(username);
    // check if user exist
    if (user == null) {
      return res.status(400).json({ status: false, msg: "Cannot find user" });
    }
    // chack in password is correct
    if (!await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ status: false, msg: "Login invalid username or password incorrect" });
    }
    //generate jwt token
    const accessToken = generateAccessToken({ "username": user.username, "password": user.password, "name": user.name });

    res.status(200).json({ status: true, msg: "Logged in successfuly.", data: { accessToken: accessToken } });
  } catch (error) {
    res.status(500).json({ status: false, msg: "Some thing went wrong Please try again later.", errorsDetiles: error });
  }
};

const signup = async (req, res) => {
  //check validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: false, msg: "Input validation Error", errorsDetiles: errors.array() });
  }

  try {
    let { username, password, name } = req.body;
    let hashedPassword = await bcrypt.hash(password, 10);

    //add user to db
    let result = await register(username, hashedPassword, name)
    if (!result) {
      return res.status(400).json({ status: false, msg: "Some thing went wrong please try again later" });
    }

    return res.status(201).json({ status: true, msg: "signed up successfuly" });
    
  } catch (error) {
    return res.status(500).json({ status: false, msg: "Some thing went wrong Please try again later.", errorsDetiles: error });
  }
};

const change_password = async (req, res) => {
  //check validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: false, msg: "Input validation Error", errorsDetiles: errors.array() });
  }

  try {
    let { username, password } = req.body;
    //get user from db
    const user = await getUsereByUsername(username);
    // check if user exist
    if (user == null) {
      return res.status(400).json({ status: false, msg: "Cannot find user" });
    }
    
    let hashedPassword = await bcrypt.hash(password, 10);
    let result = await cahngePassword(user.id,hashedPassword)
    if (!result) {
      return res.status(400).json({ status: false, msg: "Some thing went wrong please try again later" });
    }

    res.status(200).json({ status: true, msg: "Password cahnged successfuly." });

  } catch (error) {
    res.status(500).json({ status: false, msg: "Some thing went wrong Please try again later.", errorsDetiles: error });
  }
};

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "150m" });
};

module.exports = {
  login,
  signup,
  change_password
};
