const express = require("express");
const productRoute = require("./apis/products/routes");
const connectDB = require("./database");
const morgan = require("morgan");
const cors = require("cors");
const notFound = require("./middlewares/NotFound");
const errorHandler = require("./middlewares/ErrorHandler");
const path = require("path");
const postsRoutes = require("./apis/posts/post.routes");
const autherRoutes = require("./apis/Authors/Author_Routes");
const bookRoute = require("./apis/Books/Books_Routes");
const tagRoutes = require("./apis/Tag/Tag_Routes");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/media", express.static(path.join(__dirname, "media")));

app.use("/products", productRoute);

app.use("/posts", postsRoutes);

app.use("/authors", autherRoutes);
app.use("/books", bookRoute);
app.use("/tags", tagRoutes);

app.use(notFound);
app.use(errorHandler);

connectDB();
app.listen(8000, () => {
  console.log("i am running on port 8000");
});
