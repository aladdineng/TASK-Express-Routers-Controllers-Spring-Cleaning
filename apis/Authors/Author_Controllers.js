const Auther = require("../../models/Author");

const getallauther = async (req, res, next) => {
  try {
    const authers = await Auther.find();
    return res.status(200).json(authers);
  } catch (error) {
    next(error);
  }
};

const createAuther = async (req, res, next) => {
  try {
    const auther = await Auther.create(req.body);
    return res.status(201).json(auther);
  } catch (error) {
    next(error);
  }
};
module.exports = { getallauther, createAuther };
