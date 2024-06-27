const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, default: 100 },
  slug: String,
  image: String,
});

ProductSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = mongoose.model("Product", ProductSchema);
