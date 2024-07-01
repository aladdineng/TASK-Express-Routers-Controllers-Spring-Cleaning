const errorHandler = (error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json({ message: err.message || err.msg || " Internal Server Error" });
};

module.exports = errorHandler;
