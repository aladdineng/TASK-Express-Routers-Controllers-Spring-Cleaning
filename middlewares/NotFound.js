const notFound = (req, res, next) => {
  return res.status(404).json({ msg: "Path not Found" });
};

module.exports = notFound;
