const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  }
},{
    collection: "cartItems"
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem;
