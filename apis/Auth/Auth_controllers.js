const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = { _id: user._id, username: user.username };
  const token = jwt.sign(payload, "ala123");
  return token;
};

const createUser = async (req, res, next) => {
  try {
    const passowrd = req.body.passowrd;
    //hash password

    req.body.passowrd = await bcrypt.hash(req.body.passowrd, 10);

    const user = await User.create(req.body);

    const token = generateToken(user);
    return res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

const singin = async (req, res, next) => {
  try {
    const user = req.user;
    const token = generateToken(user);
    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, singin };
