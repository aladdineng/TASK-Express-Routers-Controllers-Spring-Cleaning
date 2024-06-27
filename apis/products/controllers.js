const Product = require("../../models/product");

const getAllproducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    return next(error);
  }
};

const getOneproducts = async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (product) {
      return res.status(200).json(product);
    } else {
      return res
        .status(404)
        .json({ msg: "Product with this id, is not found" });
    }
  } catch (error) {
    return next(error);
  }
};

const createProducts = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    return next(error);
  }
};

const deleteProducts = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    if (product) {
      await product.deleteOne();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await Product.findOneAndUpdate(
      { _id: productId },
      { ...req.body },
      {
        new: true,
      }
    );
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllproducts,
  getOneproducts,
  createProducts,
  deleteProducts,
  updateProduct,
};
