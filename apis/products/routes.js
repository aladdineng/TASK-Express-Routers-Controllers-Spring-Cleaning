const express = require("express");

const productRoute = express.Router();
const {
  getAllproducts,
  getOneproducts,
  createProducts,
} = require("./controllers");

productRoute.get("/", getAllproducts);

productRoute.get("/:id", getOneproducts);

productRoute.post("/", createProducts);

module.exports = productRoute;
