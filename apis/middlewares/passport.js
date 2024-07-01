const User = require("../../models/User");

const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const JwtStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const localStrategy = new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password",
  },
  async (username, passowrd, next) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return next({ msg: "username or passpord is wrong! " });
      }
      const checkPassword = await bcrypt.compare(passowrd, user.password);
      if (checkPassword == false) {
        return next({ msg: "username or passpord is wrong! " });
      }
      next(false, user);
    } catch (error) {
      next(error);
    }
  }
);
const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
  },
  async (payload, next) => {
    const user = await User.findById(payload._id);
    if (!user) {
      return next({ msg: "User not found! " });
    }
    next(null, user);
  }
);

module.exports = { localStrategy, jwtStrategy };
