import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose);

const shoppingCartSchema = new mongoose.Schema({
  idShoppingCart: {
    type: Number,
    unique: true
  },
  customer: {
    type: String,
    required: true
  },
  products: [
    {
      idProduct: { type: String, required: true }, 
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true }
    }
  ],
  total: {
    type: Number,
    required: true
  }
}, { timestamps: true });

shoppingCartSchema.plugin(AutoIncrement, { inc_field: "idShoppingCart" });

export default mongoose.model("ShoppingCart", shoppingCartSchema);
