const express = require("express");

const productRoute = express.Router();
const {
  getAllproducts,
  getOneproducts,
  createProducts,
  deleteProducts,
  updateProduct,
} = require("./controllers");
const upload = require("../../middlewares/multer");

productRoute.get("/", getAllproducts);

productRoute.get("/:productId", getOneproducts);

productRoute.post("/", createProducts);

productRoute.delete("/:productId", deleteProducts);

productRoute.put("/:productId", upload.single("image"), updateProduct);

module.exports = productRoute;
