const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");

const PostSchema = new Schema({
  title: String,
  body: String,
  auther: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  user: { type: Schema.Types.ObjectId, ref: "User " },
});

module.exports = model("Post", PostSchema);
