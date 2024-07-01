const express = require("express");
const { getallBooks, createBooks } = require("./Books_Controllers");

const bookRoute = express.Router();

bookRoute.get = ("/", getallBooks);
bookRoute.post("/", createBooks);
module.exports = bookRoute;
