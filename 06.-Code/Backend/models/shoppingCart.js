const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  idProduct: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
}, {
  timestamps: true,
  collection: "products"
});

const ShoppingCartSchema = new mongoose.Schema({
  idShoppingCar: { type: String, required: true, unique: true },
  customer: { type: String, required: true },
  product: [ProductSchema],
  total: { type: Number, required: true }
}, {
  timestamps: true,
  collection: "shoppingcart"
});

module.exports = mongoose.model('ShoppingCart', ShoppingCartSchema);