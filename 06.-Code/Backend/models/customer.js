const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  billingAddress: { type: String, required: true }
},
{
    collection: "customers"
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
