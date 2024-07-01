const express = require("express");
const { getallTag, createTag } = require("./Tag_Controllers");

const tagRoutes = express.Router();

tagRoutes.get("/", getallTag);
tagRoutes.post("/", createTag);

module.exports = tagRoutes;
