const express = require("express");
const { getallauther, createAuther } = require("./Author_controllers");

const autherRoutes = express.Router();

autherRoutes.get("/", getallauther);
autherRoutes.post("/", createAuther);

module.exports = autherRoutes;
