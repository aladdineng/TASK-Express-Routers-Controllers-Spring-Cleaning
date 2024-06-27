const express = require("express");
const productRoute = require("./apis/products/routes");
const connectDB = require("./database");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const notFound = require("./middlewares/NotFound");
const errorHandler = require("./middlewares/ErrorHandler");
const path = require("path");
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/media", express.static(path.json(__dirname, "media")));

app.use("/products", productRoute);

app.use(notFound);
app.use(errorHandler);

connectDB();
app.listen(8000, () => {
  console.log("i am running on port 8000");
});
