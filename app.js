const express = require("express");
const products = require("./data");
const productRoute = require("./apis/products/routes");

const app = express();

app.use(express.json());

app.use("/products", productRoute);

app.listen(8000, () => {
  console.log("i am running on port 8000");
});
