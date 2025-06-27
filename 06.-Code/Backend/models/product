const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  idProduct: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  cathegory: String,
  custom: { type: Boolean, default: false }
}, {
  timestamps: true,
  collection: "products"
});

module.exports = mongoose.model("Product", productSchema);
