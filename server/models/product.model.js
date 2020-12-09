const { Schema, model } = require("mongoose");
const User = require("./user.model");

const productSchema = new Schema({
  productName: String,
  size: String,
  color: String,
  price: Number,
  category: String,
  subCategory: String,
  imageUrl: String,
  seller: { type: Schema.Types.ObjectId, ref: "User" }, 
});

module.exports = model("Product", productSchema);