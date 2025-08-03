const mongoose = require("mongoose");
const Counter = require("./counter");

const customerSchema = new mongoose.Schema(
  {
    idCustomer: { type: Number, unique: true, index: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    billingAddress: { type: String, required: true },
    shippingAddress: { type: String },
  },
  {
    collection: "customers",
    timestamps: true,
  }
);

customerSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "customerId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.idCustomer = counter.seq;
  }
  next();
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
