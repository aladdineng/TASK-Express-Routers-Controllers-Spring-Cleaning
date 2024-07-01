const Tag = require("../../models/Tag");

const getallTag = async (req, res, next) => {
  try {
    const tag = await Tag.find();
    return res.status(200).json(tag);
  } catch (error) {
    next(error);
  }
};

const createTag = async (req, res, next) => {
  try {
    const tag = await Tag.create(req.body);
    return res.status(201).json(tag);
  } catch (error) {
    next(error);
  }
};
module.exports = { getallTag, createTag };
