const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, default: 100 },
  auther: { type: mongoose.Schema.Types.ObjectId, ref: "Auther" },
});
module.exports = mongoose.model("Book", bookSchema);
