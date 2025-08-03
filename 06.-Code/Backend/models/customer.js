const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    idCustomer: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    billingAddress: { type: String, required: true },
    shippingAddress: { type: String, required: false },
  },
  {
    collection: "customers",
    timestamps: true, 
  }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
