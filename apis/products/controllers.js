const products = require("../../data");

const getAllproducts = (req, res) => {
  return res.json(products);
};

const getOneproducts = (req, res) => {
  const id = req.params.id;

  const product = products.find((product) => {
    return product.id == id;
  });
  if (product) {
    res.json(product);
  } else {
    return res.json("there is no products..");
  }
};

const createProducts = (req, res) => {
  products.push(req.body);
  return res.json(products);
};

module.exports = { getAllproducts, getOneproducts, createProducts };
