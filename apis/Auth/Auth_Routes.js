const express = require("express");
const { createUser, singin } = require("./Auth_controllers");
const passport = require("passport");

const authRouter = express.Router();

authRouter.post = ("/singup", createUser);
authRouter.post =
  ("/singin", passport.authenticate("local"), { session: false }, singin);

module.exports = authRouter;
