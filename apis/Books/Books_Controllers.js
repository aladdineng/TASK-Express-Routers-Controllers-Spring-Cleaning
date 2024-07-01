const Auther = require("../../models/Author");
const Book = require("../../models/Book");

const getallBooks = async (req, res, next) => {
  try {
    const books = await Book.find().populate("authors");
    return res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

const createBooks = async (req, res, next) => {
  try {
    const book = await Book.create(req.body);

    //Update ..
    await Auther.updateMany(
      { _id: req.body.authers },
      { $push: { books: book._id } }
    )(req.body.auther, {
      $push: { books: book._id },
    });
    return res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};
module.exports = { getallBooks, createBooks };
