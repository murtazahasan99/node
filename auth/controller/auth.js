const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { register,getUsereByUsername } = require("../model/db");


const login = async (req, res) => {
  try {
    const user = await getUsereByUsername(req.body.username);
    if (user == null) {
      return res.status(400).send("Cannot find user");
    }
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = generateAccessToken({"username":user.username,"password":user.password,"name":user.name});

      res.json({ accessToken: accessToken });
    } else {
      res.send("Not Allowed");
    }
  } catch {
    res.status(500).send();
  }
};

const signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedPassword };
    let result = await register(req.body.username,hashedPassword, req.body.name)
    if(result){

        res.status(201).json({ msg: "signed up successfuly", status: true });
    };
  } catch {
    res.status(500).send();
  }
};

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "150m" });
}

module.exports = {
  login,
  signup,
};
